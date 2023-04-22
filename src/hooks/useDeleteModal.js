import React from "react";
import { message, Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDeleteRequest } from "./request";
const { confirm } = Modal;

export const useDeleteModal = () => {
    const deleteRequest = useDeleteRequest();
    const showDeleteConfirm = (url, resquest) => {
        confirm({
            title: "Are you sure delete this task?",
            icon: <ExclamationCircleFilled />,
            content: "Some descriptions",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            async onOk() {
                const { response, success, error } =
                    await deleteRequest.request({
                        url,
                    });
                if (success) {
                    if (response) {
                        message.success(`Succesfully deleted`);
                        resquest();
                    }
                } else {
                    message.error(error);
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    return { showDeleteConfirm };
};
