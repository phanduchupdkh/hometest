import React, { useState } from 'react'
import Lists from './lists'
import ModalAdd from './modalAdd'
const ListCrud = () => {
    const [data, setData] = useState(JSON.parse(localStorage.getItem("crud")) || [])
    const [stateModal, setStateModal] = useState({
        isModalVisible: false,
        id: ''
    })
    return (
        <>
            <ModalAdd
                data={data}
                setData={setData}
                stateModal={stateModal}
                setStateModal={setStateModal}
            />
            <Lists
                data={data}
                setData={setData}
                stateModal={stateModal}
                setStateModal={setStateModal}
            />
        </>
    )
}

export default ListCrud