
export const kbToBytes = (value = 1) => value * 1000;
export const mbToBytes = (value = 1) => kbToBytes(value * 1024);
export const gbToBytes = (value = 1) => mbToBytes(value * 1024);

export const getSizeDescription = (size) =>{
    if(size <= 0){
        return;
    }

    if(size < 1024){
        return `(${size} bytes)`
    }

    const sizeKb = Math.ceil(size / 1024);
    if(sizeKb < 1024){
        return `(${sizeKb} KB)`
    }

    const sizeMB = Math.ceil(sizeKb / 1024);
    if(sizeMB < 1024){
        return `(${sizeMB} MB)`
    }

    const sizeGB = Math.ceil(sizeKb / 1024);
    return `(${sizeGB} GB)`
}