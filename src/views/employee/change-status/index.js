import HrSelect from '@/components/common/HrSelect';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from '../store';
import { status_options } from '@/lib/constants';

const ChangeStatus = ({ open, setOpen, empId, setEmpId }) => {
    const [status, setStatus] = useState('');
    const dispatch = useDispatch();
    const { mutationLoading } = useSelector((state) => state.employee);

    const handleChange = (e) => {
        setStatus(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = {
                employee_id: empId,
                status: status,
            }
            const res = await dispatch(changeStatus(submitData)).unwrap();
            if (res.success) {
                toast.success(res.message);
                onOpenChange();
            } else {
                toast.error(res.message || 'Something went wrong');
            }
        } catch (error) {
        }
    }
    const onOpenChange = () => {
        setOpen(!open);
        setEmpId(null);
    }
    return (
        <Modal open={open} onOpenChange={setOpen}>
            <ModalContent>
                <ModalTitle>Change Status</ModalTitle>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    <HrSelect options={status_options} name='status' label='Status' placeholder='Select Status' onChange={handleChange} value={status} required />
                    <Button type='submit' className={'w-full'} disabled={mutationLoading}>
                        {mutationLoading ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default ChangeStatus;