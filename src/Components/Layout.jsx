import {BrowserRouter, Route} from "react-router-dom";
import {NavBar} from "./NavBar";
import Routes from "../Routes";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ThemeAction from "../redux/actions/ThemeAction";

export const Layout = () => {
	const themeReducer = useSelector(state => state.ThemeReducer)

	const dispatch = useDispatch()

	useEffect(() => {
		const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

		const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

		dispatch(ThemeAction.setMode(themeClass))

		dispatch(ThemeAction.setColor(colorClass))
	}, [dispatch])



	return (
		<BrowserRouter>
			<Route render={() => (
				<div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
					<div className="layout-content">
						<NavBar/>
						<div className="layout-content-main">
							<Routes />
						</div>
					</div>
				</div>
			)}/>
		</BrowserRouter>
	)
}