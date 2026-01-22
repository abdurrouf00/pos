import HrInput from '@/components/common/HrInput';
import { Button } from '@/components/ui/button';
import { Modal, ModalContent, ModalTitle } from '@/components/ui/modal';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../store';

const ChangePasswordForm = ({ open, setOpen, empId }) => {
    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: ""
    });

    const dispatch = useDispatch();
    const { mutationLoading } = useSelector((state) => state.employee);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const onOpenChange = () => {
        setOpen(!open);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.new_password !== formData.confirm_password) {
            toast.error('Password does not match');
            return;
        }
        try {
            const submitData = {
                employee_id: empId,
                new_password: formData.new_password,
            }
            const res = await dispatch(changePassword(submitData)).unwrap();
            console.log('res', res);
            if (res.success) {
                toast.success(res.message);
                onOpenChange();
            } else {
                toast.error(res.msg || 'Something went wrong');
            }
        } catch (error) {
            console.log('Something went wrong');
        }
    };
    return (
        <Modal open={open} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalTitle>Change Password</ModalTitle>
                <form onSubmit={handleSubmit} className='space-y-4 mt-4'>
                    <HrInput
                        name="new_password"
                        label="New Password" placeholder="New Password"
                        value={formData.new_password} onChange={handleChange}
                        required
                        type="password"
                        minLength={6}
                    />
                    <HrInput
                        name="confirm_password" label="Confirm Password" placeholder="Confirm Password" value={formData.confirm_password} onChange={handleChange} required type="password" minLength={6} />
                    <Button
                        className={'w-full'} type="submit" disabled={mutationLoading}>
                        {mutationLoading ? 'Saving...' : 'Save'}
                    </Button>
                </form>

            </ModalContent>
        </Modal>
    );
};

export default ChangePasswordForm;