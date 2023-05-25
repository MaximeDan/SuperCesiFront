import { Dropdown, Navbar} from "flowbite-react";

export const NavBar = () => {
    return (
        <Navbar
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand href="">
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SuperCesi</span>
            </Navbar.Brand>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    active={true}
                >
                    Home
                </Navbar.Link>

            <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label='Login/Register'
                >
                    <Dropdown.Item>
                        <Navbar.Link
                            href="/login"
                            active={true}
                        >
                            Login
                        </Navbar.Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Navbar.Link
                            href="/register"
                            active={true}
                        >
                            Register
                        </Navbar.Link>
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div>


            </Navbar.Collapse>
        </Navbar>
    )
}