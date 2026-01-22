import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal'
import React, { useEffect, useState } from 'react'
import { getRoleAccess, setPermissions, setRoleAccess } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRight, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';


const MenuItem = ({ menu }) => {
  const { permissions, menus, isLoadingPermissions } = useSelector((state) => state.role);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckboxChange = (key, checked) => {
    if (checked) {
      dispatch(setPermissions([...permissions, key]));
    } else {
      dispatch(setPermissions(permissions.filter((permission) => permission !== key)));
    }
  }
  return (
    <div className={cn('flex flex-col gap-1', {
      'border-l': isOpen
    })}>
      <div className={cn('flex items-center gap-1')}>

        {(menu.children && menu.children.length > 0 || menu.internal_links) && <Button onClick={() => setIsOpen(!isOpen)} variant="ghost" size="sm"> <Plus size={10} className='border rounded bg-green-50' /></Button>}
        <Checkbox id={menu.menu_uid} checked={permissions.includes(menu.menu_uid)} onCheckedChange={(checked) => handleCheckboxChange(menu.menu_uid, checked)} />
        <h1>{menu.menu_name}</h1>
      </div>
      <div className='flex flex-col gap-1 pl-10'>
        {isOpen && menu.children && menu.children.map((child, index) => (
          <MenuItem key={index} menu={child} />
        ))}
        {isOpen && <div className='flex gap-2 '>
          {
            menu.internal_links && Object.keys(menu.internal_links).length > 0 && Object.keys(menu.internal_links).map((key, index) => (
              <div key={index} className='flex items-center gap-1'>
                <Checkbox id={key} checked={permissions.includes(key)} onCheckedChange={(checked) => handleCheckboxChange(key, checked)} />
                <Label className='text-sm text-neutral-600' htmlFor={key}>{menu.internal_links[key]}</Label>
              </div>
            ))
          }
        </div>}
      </div>

    </div>
  )
}
export const LoadingSkeletonTree = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="h-4 w-2/4 bg-gray-200 rounded-sm animate-pulse"></div>
      <div className="h-4 w-1/4 bg-gray-200 rounded-sm animate-pulse"></div>
      <div className="h-4 w-2/4 bg-gray-200 rounded-sm animate-pulse"> </div>
      <div className="h-4 w-1/4 bg-gray-200 rounded-sm animate-pulse"></div>
      <div className="h-4 w-2/4 bg-gray-200 rounded-sm animate-pulse"> </div>
      <div className="h-4 w-1/4 bg-gray-200 rounded-sm animate-pulse"></div>
      <div className="h-4 w-1/4 bg-gray-200 rounded-sm animate-pulse"></div>
    </div>
  )
}
export default function AccessForm({ open, setOpen, roleId }) {
  const [saveLoading, setSaveLoading] = useState(false);

  const { permissions, menus, isLoadingPermissions } = useSelector((state) => state.role);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roleId) {
      dispatch(getRoleAccess(roleId));
    }
  }, [dispatch, roleId]);

  const onOpenChange = () => {
    setOpen(!open);
  };
  const handleSave = async () => {
    setSaveLoading(true);
    try {
      const action = dispatch(setRoleAccess({ id: roleId, accesses_uid: permissions }));
      const res = await action.unwrap();
      if (res) {
        toast.success('Access updated');
        onOpenChange();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSaveLoading(false);
    }
  }
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className='max-w-3xl max-h-[70vh] overflow-y-auto'>
        <ModalTitle>Access</ModalTitle>
        <div className='flex flex-col  text-sm text-neutral-700'>
          {
            isLoadingPermissions ? <LoadingSkeletonTree /> : menus.map((menu, index) => (
              <MenuItem key={index} menu={menu} />
            ))
          }
        </div>
        <div className='flex justify-end'>
          <Button disabled={saveLoading} onClick={handleSave}>{saveLoading ? 'Saving...' : 'Save'}</Button>
        </div>
      </ModalContent>
    </Modal>
  )
}
