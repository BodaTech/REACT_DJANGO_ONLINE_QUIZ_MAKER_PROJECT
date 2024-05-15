import React from "react"

interface data{
    participations: {
        score: number,
        user: {
            username: string
        }
    }[]
}

const ParticipationsDetails: React.FC<{data: data}> = ({data}) => {
    return <>
        <div
            className="p-4 px-5  max-h-72 overflow-auto"
        >
            <table
                className="text-center w-full"
            >
                <thead
                    className="bg-gray-200 h-8 border"
                >
                    <tr>
                        <th
                            className="border-r border-slate-100"
                        >Participant</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.participations?.map((row, index) => (
                        <tr
                            className="h-8 border"
                            key={index}
                        >
                            <td
                                className="border"
                            >{row.user.username}</td>
                            <td>{row.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
}

export default ParticipationsDetails