import React from 'react'
import { Row, Col, Image, Popconfirm } from 'antd'
import { MoreOutlined } from '@ant-design/icons'

const Lists = ({ data, setData, setStateModal }) => {

    const onClickDelete = (value) => {
        let newData = data.filter(d => d.id !== value)
        localStorage.setItem("crud", JSON.stringify(newData))
        setData(newData)
    }

    const onClickEdit = (value) => {
        setStateModal({
            isModalVisible: true,
            id: value
        })
    }
    return (

        <>
            {
                data.map(item => (
                    <Row key={item.id} style={{ margin: '3px' }}>
                        <Col xs={1} lg={1} >
                            <Image
                                width={'20px'}
                                height={'20px'}
                                preview={false}
                                src={item.url}
                            />
                        </Col>
                        <Col xs={18} lg={10}>
                            {item.name}
                        </Col>
                        <Col xs={1} lg={1}>
                            <Popconfirm icon={null} placement="left"
                                okText={<span onClick={() => onClickEdit(item.id)} >Edit</span>}
                                cancelText={<span onClick={() => onClickDelete(item.id)}>Delete</span>}
                            >
                                <MoreOutlined />
                            </Popconfirm>
                        </Col>
                    </Row>)
                )
            }
        </>
    )
}


export default Lists