import { useGetOrdersQuery, useLazyGetOrderByIdQuery } from './store'
import HrModal from '@/components/common/HrModal'
import toast from 'react-hot-toast'
export default function HoldOrdersModal({ toggle, setToggle, setItems, setCurrentOrderId, draftOrders }) {
    const [getOrderById, { data: order, isLoading }] = useLazyGetOrderByIdQuery();
    
    console.log('draftOrders', draftOrders?.data?.data)
    const handleOrder = async (id) => {
      let toastId = toast.loading('Adding Order...')
       setCurrentOrderId(id)
       const res = await getOrderById(id)
       toast.dismiss(toastId)
       toast.success('Order added to cart')
       if(res?.status==='fulfilled') {
        const itemsData = res?.data?.data?.items.map((item) => ({
           product_name: item?.product_name,
           qty: item?.qty,
           discount: +item?.discount_amount,
           discount_type: item?.discount_type,
           discount_value: +item?.discount_value,
           amount: +item?.amount,
           pricing: {
            unit_price: +item?.rate,
           }
        }))
        setItems(itemsData)
        setToggle(false)
       }
    }
  return (
    <HrModal title="Hold Orders" toggle={toggle} setToggle={setToggle}>
     
       <div className='relative'>
       
      <div className='space-y-2'>
      {draftOrders?.data.data.map((order) => (
            <div onClick={() => handleOrder(order.id)} key={order.id} className='bg-secondary cursor-pointer p-3 rounded-md'>
                <h3 className='text-sm font-bold'>{order.customer_name}</h3>
               <p className='text-sm'>{order.total}</p>
            </div>
        ))
      }
      </div>
       </div>
    </HrModal>
  )
}