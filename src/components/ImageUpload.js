import React, { useEffect, useState } from "react";
import { Upload, Modal } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { MediaApi } from "../../helpers/Axios";
import { handleEncrypted } from "../../helpers/helpers";

const ImageUpload = ({ name, form, updateDetails, multiple, isVideo }) => {
    const [loading, setLoading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    const [fileList, setFileList] = useState([]);

    const handleCancel = () => setPreviewOpen(false);

    const onRemove = async (file, videoUrl) => {
        const { url, status } = file;
        if (status === "error") {
            setFileList([]);
        }
        const loc = new URL(url);
        const deleteKey = videoUrl ? videoUrl.slice(1) : loc.pathname.slice(1);

        const encrypted = handleEncrypted();
        const headers = {
            "x-auth-key": encrypted,
        };

        try {
            const res = await MediaApi.post(
                "/api/v1/aws/delete",
                {
                    key: deleteKey,
                },
                {
                    headers,
                }
            );
            setLoading(false);
            const data = res.data;

            if (!!data.url) {
                if (multiple) {
                    let i = form.getFieldValue(name).indexOf(data.url);
                    let a = [
                        ...form.getFieldValue(name).slice(0, i),
                        ...form.getFieldValue(name).slice(i + 1),
                    ];
                    setFileList(
                        a.map((item, i) => {
                            return {
                                uid: i,
                                name: "",
                                status: "done",
                                url: item,
                            };
                        })
                    );
                    form.setFieldValue(name, a);
                } else {
                    setFileList([]);
                    form.setFieldValue(name, "");
                }
            } else if (data?.message === "FILE_NOT_FOUND") {
                setFileList([]);
                form.setFieldValue(name, "");
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    const handlePreview = async (file) => {
        setPreviewImage(file.url);
        setPreviewOpen(true);
        file.url &&
            setPreviewTitle(file.url.substring(file.url.lastIndexOf("/") + 1));
    };

    const handleChange = async ({ file }) => {
        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("project", "datatalim");
        const encrypted = handleEncrypted();
        const headers = {
            "x-auth-key": encrypted,
        };
        try {
            const res = await MediaApi.post("/api/v1/aws", formData, {
                headers,
            });
            const data = res.data;
            const a = form.getFieldValue(name);

            if (file.type.split("/")[0] === "video") {
                setFileList([
                    {
                        uid: data.id,
                        name: "",
                        status: "done",
                        url: data.url,
                    },
                ]);
            } else {
                setFileList(
                    multiple
                        ? [
                              ...fileList,
                              {
                                  uid: data.id,
                                  name: "",
                                  status: "done",
                                  url: data.url,
                              },
                          ]
                        : [
                              {
                                  uid: data.id,
                                  name: "",
                                  status: "done",
                                  url: data.url,
                              },
                          ]
                );
            }
            if (multiple) {
                form.setFieldValue(
                    name,
                    Array.isArray(a) ? [...a, data.url] : [data.url]
                );
                console.log(form.getFieldValue(name));
            } else {
                form.setFieldValue(name, data.url);
            }
        } catch (error) {
            setFileList([
                {
                    uid: "22",
                    name: "image.png",
                    status: "error",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    useEffect(() => {
        if (updateDetails != null && updateDetails[name] != null) {
            form.setFieldsValue(updateDetails);
            if (isVideo) {
                setFileList([
                    {
                        uid: updateDetails[name],
                        status: "done",
                        url: updateDetails[name],
                        name: "",
                    },
                ]);
            } else {
                setFileList(
                    multiple
                        ? updateDetails[name].map((item) => {
                              return {
                                  uid: item.url,
                                  status: "done",
                                  url: item.url,
                                  name: "",
                              };
                          })
                        : [
                              {
                                  uid: updateDetails[name],
                                  status: "done",
                                  url: updateDetails[name],
                                  name: "",
                              },
                          ]
                );
            }
        }
    }, [updateDetails]);

    return (
        <>
            <Upload
                accept='.jpg, .png, .gif, .mp4, .mov, .avi'
                listType='picture-card'
                fileList={fileList}
                customRequest={(file) => handleChange(file)}
                onPreview={handlePreview}
                onRemove={onRemove}
            >
                {!multiple && fileList?.length === 1 ? null : uploadButton}
            </Upload>

            <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt='example'
                    style={{ width: "100%" }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default ImageUpload;
