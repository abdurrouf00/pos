import React from 'react';
import NewProduct from '@/views/crm/products/list/index';
import ProductTable from '@/views/crm/products/list/table';


export default function ProductsPage() {
    return (
        <div>
            <NewProduct />
            <ProductTable />
        </div>
    );
}