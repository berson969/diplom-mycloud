import React from 'react';

const NotFoundFiles : React.FC = () => {
    return (
        <div className="alert alert-secondary text-center">
            <h4 className="alert-heading">В хранилище нет файлов</h4>
            <p>Добавьте файлы, чтобы начать работу.</p>
        </div>
    );
};

export default NotFoundFiles;
