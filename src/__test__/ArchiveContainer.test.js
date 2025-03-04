import { render } from "@testing-library/react"
import ArchiveContainer from "../components/ArchiveContainer/ArchiveContainer"

test('renders ArchiveContainer', () => {
    render(<ArchiveContainer/>)
    const archiveContainer = document.querySelector('.show-archive-notes-container')
    expect(archiveContainer).toBeInTheDocument()
})