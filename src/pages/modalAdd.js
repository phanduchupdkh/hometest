import React from 'react'
import {
    Modal, Button, Input, Form
} from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons'

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 20,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 14,
        span: 10,
    },
}

const ModalAdd = ({ data, setData, stateModal, setStateModal }) => {
    const [form] = Form.useForm()
    let itemCrud = data.find(item => item.id === stateModal.id)
    if (itemCrud) {
        form.setFieldsValue({
            name: itemCrud.name,
            url: itemCrud.url
        })
    }

    const showModal = () => {
        form.resetFields()
        setStateModal({
            isModalVisible: true,
            id: ''
        })
    }

    const handleCancel = () => {
        setStateModal(false);
    }
    const onFinish = (values) => {
        if (stateModal.id) {
            let dataEdit = data.map(d => d.id === stateModal.id ? { ...values, id: d.id } : d)
            localStorage.setItem("crud", JSON.stringify(dataEdit))
            setStateModal({
                isModalVisible: false,
                id: ''
            })
            setData([...dataEdit])
        } else {
            let id = Date.now().toString(36)
            data.unshift({ ...values, id })
            localStorage.setItem("crud", JSON.stringify(data))
            setStateModal({
                isModalVisible: false,
                id: ''
            })
            setData([...data])
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }
    return (
        <>
            <Button
                onClick={showModal}
                icon={<PlusSquareOutlined />}
                type="primary"
                style={{ margin: '10px' }}
            >
                Create
            </Button>
            <Modal title={stateModal.id ? "Edit bookmark" : "Add bookmark"}
                style={{ top: 10 }}
                visible={stateModal.isModalVisible}
                closable={false}
                footer={null}
            >
                <Form
                    form={form}
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="url"
                        name="url"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your url!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button key="back" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ModalAdd