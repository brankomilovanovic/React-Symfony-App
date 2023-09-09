import React, {useEffect} from "react";
import {useDropzone} from "react-dropzone";
import { LoadingButton } from "@mui/lab";
import { getSizeDescription } from "../Util/FileUtil";
import strings from "../localization";

const FileUpload = ({formats:accept = null, maxSize = null, loading = false, files, setFiles, ...props}) => {

    const {acceptedFiles, getRootProps, getInputProps, fileRejections} = useDropzone({
        onDrop: files => onDrop(files),
        accept,
        maxSize,
    });

    useEffect(() => {
        if (fileRejections.length > 0) {
            console.log(strings.error.File[fileRejections[0].errors[0].code], strings.components.FileUpload.error)
        }
    }, [fileRejections])

    const onDrop = (files) => {
        setFiles(files)
        if (props.onDrop) {
            props.onDrop(files)
        }
    }

    const renderFiles = () => {
        return files.map(file => (
            <div key={file.name} className="file-row">
                <div className="description">{`${file.name} ${file.size ? getSizeDescription(file.size) : getSizeDescription(file.documentSize)}`}</div>
            </div>
        ));
    }

    return (
        <div className='file-upload-component'>
            <section className="drop-zone">
                <div {...getRootProps({className: 'dropzone'})}>
                    <input {...getInputProps()} />
                    <p>{strings.components.FileUpload.dragDrop}</p>
                </div>
                { !props?.hideUploadButton &&
                    <div className='meta-data'>
                        <LoadingButton variant="contained" color="primary" className="rounded-button"
                                onClick={() => props.upload(files)}
                                disabled={props?.disabled}
                                loading={loading}>
                            <img src = {'/images/folder-upload.svg'} />
                            {strings.components.FileUpload.upload}
                        </LoadingButton>
                        <aside>
                            <div className="uploaded-files">{renderFiles()}</div>
                        </aside>
                    </div>

                }
            </section>
        </div>
    );

}
export default FileUpload
