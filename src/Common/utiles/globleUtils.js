
export const getServerPort = () => {
    return process.env.NODE_ENV === 'production' ? '8000': '8080';
}