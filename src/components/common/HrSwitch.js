import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

const HrSwitch = ({ name, label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={name} name={name} checked={checked} onCheckedChange={onChange} />
      <Label htmlFor={name}>{label}</Label>
    </div>
  )
}
export default HrSwitch;