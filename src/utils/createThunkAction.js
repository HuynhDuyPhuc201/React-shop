export const createThunkAction = (callback) =>{
    return (data) =>{
        return async (dispatch) =>{
            try {
                await callback(data, dispatch)
                data?.success?.()
            } catch (err) {
                data?.error?.(err)
            }finally{
                data?.finally?.()
            }
        }
    }
}