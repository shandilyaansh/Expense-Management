import { Layout } from 'antd'
import React from 'react'

const Spinner = () => {
    return (
        <Layout>
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </Layout>
    )
}

export default Spinner