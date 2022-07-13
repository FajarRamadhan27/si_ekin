import { TextareaAutosize } from "@mui/material"

function InputAssessmentNote() {
    return (
        <TextareaAutosize
            disabled
            maxRows={5}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            defaultValue={'5: Menyelesaikan 100% target atau lebih\n4: Menyelesaikan 95% ~ 99.9% target atau lebih\n3: Menyelesaikan 85% ~ 94.9% target atau lebih\n2: Menyelesaikan 75% ~ 84.9% target atau lebih\n1: Menyelesaikan kurang dari 75% target'}
            style={{ width: 400, border: '1px' }}
        />
    )
}

export default InputAssessmentNote
