function calculateTimeDifference(startTime, endTime) {
    const startParts = startTime.split(":")
    const endParts = endTime.split(":")

    const startHours = parseInt(startParts[0])
    const startMinutes = parseInt(startParts[1])

    const endHours = parseInt(endParts[0])
    const endMinutes = parseInt(endParts[1])

    const totalStartMinutes = startHours * 60 + startMinutes
    const totalEndHours = endHours * 60 + endMinutes

    const differenceMinutes = totalEndHours - totalStartMinutes

    const hours = Math.floor(differenceMinutes / 60)
    const minutes = differenceMinutes % 60

    return {
        result: `${hours}h ${minutes}h`,
        minutes: differenceMinutes
    }
}

export { calculateTimeDifference }