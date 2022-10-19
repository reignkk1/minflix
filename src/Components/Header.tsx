import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// ======================================================================================================

// Style

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  padding: 0 80px;
  z-index: 1;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 150px;
  height: 100%;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;
const Menu = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  position: relative;
  text-align: center;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.2s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
    cursor: pointer;
  }
`;
const Circle = styled(motion.div)`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
  position: absolute;
  left: 0;
  right: 0;
  margin: 10px auto 0 auto;
`;
const Search = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white.darker};
  svg {
    height: 20px;
  }
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;
const Input = styled(motion.input)`
  transform-origin: right center;
  padding: 7px 10px 7px 40px;
  font-size: 16px;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

// 로고 Variant
const logoVariant = {
  initial: { fillOpacity: 1 },
  hover: { fillOpacity: [1, 0, 1], transition: { repeat: Infinity } },
};

// ======================================================================================================

function Header() {
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");

  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();

  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  const searchClick = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((current) => !current);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,0.8)",
        });
      } else {
        navAnimation.start({
          backgroundColor: "rgba(0,0,0,0.2)",
        });
      }
    });
  }, [scrollY]);

  interface IForm {
    keyword: String;
  }
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();

  const onSubmit = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav animate={navAnimation} initial={{ backgroundColor: "rgba(0,0,0,1)" }}>
      <Container>
        <Logo
          whileHover="hover"
          variants={logoVariant}
          initial="initial"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"></motion.path>
        </Logo>
        <Menu>
          <Link to="/">
            <Item>
              Home
              {homeMatch ? <Circle layoutId="circle" /> : null}
            </Item>
          </Link>
          <Link to="/tv">
            <Item>
              Tv Show
              {tvMatch ? <Circle layoutId="circle" /> : null}
            </Item>
          </Link>
        </Menu>
      </Container>
      <Container>
        <Search onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "linear" }}
            placeholder="제목을 입력해주세요."
          />
          <motion.svg
            onClick={searchClick}
            animate={{ x: searchOpen ? -237 : 0 }}
            transition={{ type: "linear" }}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
          </motion.svg>
        </Search>
      </Container>
    </Nav>
  );
}

export default Header;
