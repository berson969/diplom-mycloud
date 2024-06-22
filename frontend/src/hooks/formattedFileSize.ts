export  const formattedFileSize = (size: number) => {
    const kilobytes = size / 1024;
    const megabytes = kilobytes / 1024;
    const gigabytes = megabytes / 1024;

    if (gigabytes >= 1) {
        return `${gigabytes.toFixed(2)} GB`;
    } else if (megabytes >= 1) {
        return `${megabytes.toFixed(2)} MB`;
    } else if (kilobytes >= 1) {
        return `${kilobytes.toFixed(2)} KB`;
    } else {
        return `${size} B`;
    }
}
