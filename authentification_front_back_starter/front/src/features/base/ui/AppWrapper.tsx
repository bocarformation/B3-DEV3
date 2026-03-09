import { Provider } from "react-redux"
import { app } from "../app-composer"

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider store={app.store}>{children}</Provider>
}