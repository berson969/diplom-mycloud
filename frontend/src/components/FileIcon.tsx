import React from 'react';

const FileIcon: React.FC<{ fileName: string }> = ({ fileName }) => {
    const iconStyle = {
        fontSize: '5em',
    };

    const extension = fileName.split('.').pop()?.toLowerCase();

	switch (extension) {
		case 'pdf':
			return <i className="bi bi-file-earmark-pdf" style={iconStyle}></i>; // Bootstrap иконка для PDF
		case 'doc':
		case 'docx':
			return <i className="bi bi-file-earmark-word" style={iconStyle}></i>; // Bootstrap иконка для Word
		case 'xls':
		case 'xlsx':
			return <i className="bi bi-file-earmark-excel" style={iconStyle}></i>; // Bootstrap иконка для Excel
		case 'jpg':
		case 'jpeg':
		case 'png':
		case 'tiff':
		case 'gif':
			return <i className="bi bi-file-earmark-image" style={iconStyle}></i>; // Bootstrap иконка для изображений
		case 'zip':
		case 'rar':
			return <i className="bi bi-file-earmark-zip" style={iconStyle}></i>;// Bootstrap иконка для архивов
		default:
			return <i className="bi bi-file-earmark" style={iconStyle}></i>; // Bootstrap иконка по умолчанию
	}
};

export default FileIcon;
