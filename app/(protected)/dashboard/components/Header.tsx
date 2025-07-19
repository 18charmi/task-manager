import CustomButton from "@/components/CustomButton"
import AddIcon from "@mui/icons-material/Add";

export const Header = ({ addProject }: { addProject: () => void }) => {
    return <div className="flex justify-between xs:flex-col items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">List of projects</h2>
        <CustomButton
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addProject}
            fullWidth={false}
        >
            Add Project
        </CustomButton>
    </div>
}