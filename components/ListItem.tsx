import { AiOutlineCheck } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';

interface Prop {
    text: string,
    deleteTodo: any,
    isChecked: boolean,
    toggleChecked: any
}

const ListItem = ({text, deleteTodo, isChecked, toggleChecked}: Prop) => {
  return (
    <div className="flex items-center p-[14px] px-[20px] w-full">
        <div className={`${isChecked && "bg-[#ad02fe]" } h-[24px] w-[24px] rounded-full border  border-[#bf56ff] cursor-pointer mr-[1rem] flex items-center justify-center text-white `} onClick={toggleChecked}>
            {isChecked && <AiOutlineCheck />}
        </div>

        <div className={` ${isChecked && "line-through text-[#0f90a1]"} text-white flex-1 border-b-[#484040] pl-[8px] `}>
            {text}
        </div>

        <div className="cursor-pointer text-[#AD02FE] px-[4px] " onClick={deleteTodo}>
            <ImBin />
        </div>
    </div>
  )
}

export default ListItem