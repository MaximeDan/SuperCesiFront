import {Avatar, Dropdown, Navbar} from "flowbite-react";

export const NavBar = () => {
	return (
		<Navbar
			fluid={true}
			rounded={true}
		>
			<Navbar.Brand href="">
				<img
					src=""
					className="mr-3 h-6 sm:h-9"
					alt="Flowbite Logo"
				/>
				<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
      SuperCesi
    </span>
			</Navbar.Brand>
			<div className="flex md:order-2">
				<Dropdown
					arrowIcon={false}
					inline={true}
					label={<Avatar alt="User settings" img="" rounded={true}/>}
				>
					<Dropdown.Header>
        <span className="block text-sm">
          Bonnie Green
        </span>
		<span className="block truncate text-sm font-medium">
          name@flowbite.com
        </span>
					</Dropdown.Header>
					<Dropdown.Item>
						Dashboard
					</Dropdown.Item>
					<Dropdown.Item>
						Settings
					</Dropdown.Item>
					<Dropdown.Item>
						Earnings
					</Dropdown.Item>
					<Dropdown.Divider />
					<Dropdown.Item>
						Sign out
					</Dropdown.Item>
				</Dropdown>
				<Navbar.Toggle />
			</div>
			<Navbar.Collapse>
				<Navbar.Link
					href="/navbars"
					active={true}
				>
					Home
				</Navbar.Link>
				<Navbar.Link href="/navbars">
					About
				</Navbar.Link>
				<Navbar.Link href="/navbars">
					Services
				</Navbar.Link>
				<Navbar.Link href="/navbars">
					Pricing
				</Navbar.Link>
				<Navbar.Link href="/navbars">
					Contact
				</Navbar.Link>
			</Navbar.Collapse>
		</Navbar>
	)
}