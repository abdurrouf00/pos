import HrInput from '@/components/common/HrInput'
import HrModal from '@/components/common/HrModal'
import { FormField } from '@/components/FormField'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRole } from '@/views/role/store'
import HrSelect, { mapOptions } from '@/components/common/HrSelect'
import { Minus, Plus } from 'lucide-react'
import { useCreateUserMutation, useGetUserByIdQuery, useUpdateUserMutation } from '../store'
import toast from 'react-hot-toast'
import UILoading from '@/components/ui/UILoading'

const baseSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is invalid'),
})

const extendedAddSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Password is required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      ),

    confirm_password: z.string().min(1, 'Confirm Password is required'),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'], // attach error to confirm_password field
  })
const extendedEditSchema = z
  .object({
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .optional(),

    confirm_password: z.string().optional(),
  })
  .refine(
    data => {
      // ✅ if password is not provided, skip validation
      if (!data.password) return true

      // ❌ password exists but confirm_password doesn't match
      return data.password === data.confirm_password
    },
    {
      message: 'Passwords do not match',
      path: ['confirm_password'],
    }
  )

export default function UserForm({ open, setOpen, editId, setEditId }) {
  const [roles, setRoles] = useState([''])
  const { data, isLoading: userLoading } = useGetUserByIdQuery(editId, {
    skip: !editId,
  })
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()
  const [createUser, { isLoading: createLoading }] = useCreateUserMutation()
  const createSchema = z.intersection(baseSchema, extendedAddSchema)
  const updateSchema = z.intersection(baseSchema, extendedEditSchema)
  const schema = editId ? updateSchema : createSchema
  const formData = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  }

  const dispatch = useDispatch()
  const { roleData, basicRoleData, loading: roleLoading } = useSelector(({ role }) => role)

  useEffect(() => {
    if (data?.user) {
      const user = data.user
      const roles = user?.roles.map(itm => itm.id)
      const updatedData = {
        name: user?.name,
        email: user?.email,
      }
      setRoles(roles)
      form.reset(updatedData)
    }
  }, [data])
  useEffect(() => {
    dispatch(getAllRole())
  }, [dispatch])

  const form = useForm({
    defaultValues: formData,
    resolver: zodResolver(schema),
    mode: 'onChange',
  })
  console.log('erros', form.formState.errors)
  const handleClose = () => {
    setOpen(false)
    setEditId(null)
    form.reset(formData)
  }
  const onSubmit = async data => {
    const { confirm_password, ...rest } = data
    const payload = { ...rest, roles }
    console.log('payload', JSON.stringify(payload, null, 2))
    let res
    try {
      if (editId) {
        res = await updateUser({ id: editId, data: payload }).unwrap()
      } else {
        res = await createUser(payload).unwrap()
      }
      if (res.user) {
        handleClose()
        toast.success(editId ? 'User Updated' : 'User Created')
      }
      console.log('res', res)
    } catch (error) {
      console.log('error', error)
    }
  }

  const roleDataOptions = mapOptions(roleData)
  const handleRoles = (id, index) => {
    const updatedData = roles.map((itm, i) => {
      if (i === index) {
        return id
      }
      return itm
    })
    setRoles(updatedData)
  }

  return (
    <HrModal
      title={editId ? 'Edit User' : 'Add User'}
      toggle={open}
      setToggle={setOpen}
      onClose={handleClose}
    >
      <UILoading loading={roleLoading || userLoading}>
        <div className="space-y-4">
          <FormField form={form} name="name" label="Name" placeholder="Enter name" />
          <FormField
            form={form}
            name="email"
            label="Email"
            placeholder="Enter email"
            id="user-email"
          />
          <div className="space-y-4">
            {roles.map((itm, index) => {
              return (
                <div className="flex items-end gap-2 " key={`role-${index}`}>
                  <HrSelect
                    // form={form}
                    name="roles"
                    label={index === 0 ? 'Roles' : ''}
                    placeholder="Enter roles"
                    required
                    options={roleDataOptions}
                    className="md:min-w-full"
                    value={itm}
                    onChange={e => handleRoles(e.target.value, index)}
                  />
                  <Button variant={'outline'} size="icon" onClick={() => setRoles([...roles, ''])}>
                    <Plus />
                  </Button>
                  {index !== 0 && (
                    <Button
                      variant={'outline'}
                      size="icon"
                      onClick={() => setRoles(roles.filter((_, i) => i !== index))}
                    >
                      <Minus />
                    </Button>
                  )}
                </div>
              )
            })}
          </div>
          <FormField
            form={form}
            name="password"
            label="Password"
            type="password"
            id="user-password"
            placeholder="Enter password"
          />

          <FormField
            form={form}
            name="confirm_password"
            type="password"
            label="Confirm Password"
            placeholder="Enter confirm password"
          />
          <Button
            disabled={createLoading || updateLoading}
            onClick={form.handleSubmit(onSubmit)}
            type="submit"
            className="w-full"
          >
            {createLoading || updateLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </UILoading>
    </HrModal>
  )
}
