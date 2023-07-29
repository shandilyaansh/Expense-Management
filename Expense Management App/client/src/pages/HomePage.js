import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { Modal, Form, Input, Select, message, Table, DatePicker } from 'antd'
import axios from 'axios'
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import Spinner from '../components/Spinner'
import moment from 'moment'
import Analytics from '../components/Analytics'
import {useNavigate} from 'react-router-dom'

const { RangePicker } = DatePicker

const HomePage = () => {
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allTransection, setAllTransection] = useState([])
    const [frequency, setFrequency] = useState('365')
    const [selectedDate, setSelectedDate] = useState([])
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('analytics')
    const [editable, setEditable] = useState(null);

    const navigate=useNavigate()
    // Tabels
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Type',
            dataIndex: 'type'
        },
        {
            title: 'Category',
            dataIndex: 'category'
        },
        {
            title: 'Reference',
            dataIndex: 'reference'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Actions',
            render: (text, record) => (
                <div className='mx-2'>
                    <EditOutlined onClick={() => {
                        setEditable(record)
                        setShowModal(true)
                    }} />
                    <DeleteOutlined className='mx-2' onClick={() => handleDelete(record)} />
                </div>
            )
        }
    ]



    // getAll transection

    // Use Hook
    useEffect(() => {
        const getAllTransection = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('users'));
                setLoading(true);
                const res = await axios.post('/api/v1/transections/get-transection',
                    { userid: user._id, frequency, selectedDate, type })
                setLoading(false);
                setAllTransection(res.data)
                // console.log(res.data);
            } catch (error) {
                setLoading(false)
                console.log(error);
                message.error('Fetching issue with transection')
            }
        };
        getAllTransection()
    }, [frequency, selectedDate, type])

    // Deleting handler
    const handleDelete = async (record) => {
        try {
            setLoading(true)
            await axios.post('/api/v1/transections/delete-transection', { transectionId: record._id })
            setLoading(false);
            message.success('Transaction deleted');
            navigate('/login')
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error('Unable to delete');
        }
    }

    // form Handling
    const handleSubmit = async (values) => {
        // console.log(values);
        try {
            const user = JSON.parse(localStorage.getItem('users'))
            setLoading(true);
            if (editable) {
                await axios.post('/api/v1/transections/edit-transection', {
                    payload: {
                        ...values,
                        userid: user._id,
                    },
                    transectionId: editable._id
                })
                setLoading(false);
                message.success('Transection Updated Successfully')
                navigate('/login')
            }
            else {
                await axios.post('/api/v1/transections/add-transection', { ...values, userid: user._id })
                setLoading(false);
                message.success('Transection Added Successfully')
                navigate('/login');
            }
            setShowModal(false)
            setShowModal(null)
        } catch (error) {
            setLoading(false);
            message.error("Failed to add transections")
            console.log(error);
        }
    }
    return (
        <Layout>
            {loading && <Spinner />}
            <div className='filters'>
                <div>
                    <h6>Frequency</h6>
                    <Select value={frequency} onChange={(values) => setFrequency(values)}>
                        <Select.Option value="7">Last 1 Week</Select.Option>
                        <Select.Option value="30">Last 1 Month</Select.Option>
                        <Select.Option value="365">Last 1 Year</Select.Option>
                        <Select.Option value="custom">Custom</Select.Option>
                    </Select>
                    {frequency === "custom" && (
                        <RangePicker
                            value={selectedDate}
                            onChange={(values) => setSelectedDate(values)}
                        />)}
                </div>
                <div>
                    <h6>Select Type</h6>
                    <Select value={type} onChange={(values) => setType(values)}>
                        <Select.Option value="all">All</Select.Option>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                    {frequency === "custom" && (
                        <RangePicker
                            value={selectedDate}
                            onChange={(values) => setSelectedDate(values)}
                        />)}
                </div>
                <div className='switch-icon'>
                    <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
                        onClick={() => setViewData('table')}
                    />
                    <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
                        onClick={() => setViewData('analytics')}
                    />
                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => setShowModal(true)}>Add new</button>
                </div>
            </div>
            <div className='content'>
                {viewData === 'table' ? (<Table columns={columns} dataSource={allTransection} />)
                    : (<Analytics allTransection={allTransection} />)
                }
            </div>
            <Modal title={editable ? 'Edit Transaction' : 'Add Transections'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit} initialValues={editable} >
                    <Form.Item label="Amount" name="amount">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label='Type' name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="profit">Profit</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                            <Select.Option value="borrow">Borrow</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label='Category' name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="interest">Interest</Select.Option>
                            <Select.Option value="bonus">Bonus</Select.Option>
                            <Select.Option value="pension">Pension</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="travel">Travel</Select.Option>
                            <Select.Option value="bills">Bill Payments</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="tax">Tax</Select.Option>
                            <Select.Option value="other">Others</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference">
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label="description" name="description" >
                        <Input type='text' />
                    </Form.Item>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' className='btn btn-primary'>Save</button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage