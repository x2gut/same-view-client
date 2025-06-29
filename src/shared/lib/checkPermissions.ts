const checkPermissions = (isOwner: boolean, roomPermissions: "all" | "host") => {
    return !isOwner && roomPermissions === "host" ? false : true
}

export default checkPermissions