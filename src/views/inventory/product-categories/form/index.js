import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  useCreateProductCategoryMutation,
  useGetAllProductCategoriesQuery,
  useGetProductCategoryByIdQuery,
  useUpdateProductCategoryMutation,
} from '../store'
import toast from 'react-hot-toast'
import UILoading from '@/components/ui/UILoading'
const ProductCategoriesForm = ({ open, setOpen, editId, setEditId }) => {
  const initialData = {
    name: '',
    description: '',
    slug: '',
    parent_id: '',
    icon: '',
    is_active: true,
  }
  const form = useForm({
    defaultValues: initialData,
    // resolver: zodResolver(schema),
  })
  const [addProductCategory, { isLoading: addLoading }] = useCreateProductCategoryMutation()
  const [updateProductCategory, { isLoading: updateLoading }] = useUpdateProductCategoryMutation()
  const { data: productCategory, isLoading: productCategoryLoading } =
    useGetProductCategoryByIdQuery(editId, {
      skip: !editId,
      refetchOnMountOrArgChange: true,
    })
  const { data: productCategories, isLoading: productCategoriesLoading } =
    useGetAllProductCategoriesQuery()
  const productCategoryOptions = productCategories?.data?.data?.map(item => ({
    label: item.name,
    value: item.id,
  }))
  useEffect(() => {
    if (productCategory?.data) {
      form.reset(productCategory?.data)
    }
  }, [productCategory?.data])
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    form.reset()
  }
  const onSubmit = async data => {
    console.log('data', data)
    try {
      let res
      if (editId) {
        res = await updateProductCategory({ id: editId, data })
      } else {
        res = await addProductCategory(data)
      }
      if (res?.data?.success) {
        toast.success(
          editId ? 'Product category updated successfully' : 'Product category created successfully'
        )
        handleClose()
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <HrModal
      toggle={open}
      setToggle={setOpen}
      title={editId ? 'Update Product Category' : 'Add Product Category'}
      onClose={handleClose}
    >
      <UILoading loading={productCategoryLoading}>
        <div className="space-y-4">
          <FormField name="name" label="Name" placeholder="Enter name" form={form} />
          <FormField
            name="description"
            label="Description"
            placeholder="Enter description"
            form={form}
          />
          <FormField name="slug" label="Slug" placeholder="Enter slug" form={form} />
          <FormField
            name="parent_id"
            label="Parent ID"
            placeholder="Enter parent ID"
            form={form}
            type="select"
            options={productCategoryOptions}
          />
          <FormField name="icon" label="Icon" placeholder="Enter icon" form={form} />
          <FormField
            name="is_active"
            label="Is Active"
            placeholder="Enter is active"
            form={form}
            type="switch"
          />
          <Button
            disabled={addLoading || updateLoading}
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            {addLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </UILoading>
    </HrModal>
  )
}
export default ProductCategoriesForm
