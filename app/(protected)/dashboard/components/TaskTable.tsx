import CustomButton from "@/components/CustomButton";
import CustomTable from "@/components/CustomTable";
import { useProjectStore } from "@/store/slice/project";
import { Task } from "@/types/project";
import { ColumnConfig } from "@/types/table";
import Check from "@mui/icons-material/Check";


export const TaskTable = ({ list }: { list: Task[] }) => {

    const editTask = useProjectStore(s => s.editTask);

    const columns: ColumnConfig<Task>[] = [
        { id: 'title', label: 'Title' },
        { id: 'status', label: 'Status' },
        {
            id: 'view',
            label: 'Actions',
            align: 'right',
            render: (row: Task) => (
                row.status !== 'pending' ? <></>
                    : <CustomButton size="small" variant="outlined" onClick={() => handleStatusUpdate(row)} endIcon={<Check />}>Complete</CustomButton>
            ),
        },
    ];
    const handleStatusUpdate = (row: Task) => {
        editTask(row.projectId, row.id, { status: "completed" })
    }
    return <>
        <span className="block bg-blue-100 text-blue-700 font-medium px-3 py-1 mt-4 rounded text-xs text-center">
            {list?.length ?? 0} Tasks
        </span>

        <CustomTable
            rows={list}
            columns={columns}
        />
    </>
}