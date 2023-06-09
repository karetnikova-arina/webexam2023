import { FC } from "react";

import { Input, Text, Title } from "@mantine/core";
import {
  IconSearch,
  IconPhone,
  IconBrandGithub,
  IconDatabase,
} from "@tabler/icons-react";

import { SearchModal } from "../search-modal";

import "./header.css";
import { useDisclosure } from "@mantine/hooks";
import { useViewportSize } from "@mantine/hooks";

export const Header: FC = () => {
  const [opened, { open, close }] = useDisclosure();
  const { width } = useViewportSize();
  return (
    <div className="header__wrapper">
      <header className="header__container">
        <Title className="header__logo" order={3}>
          Beauty Salon
        </Title>

        <div className="header__contact">
          <a
            target="_blank"
            className="contact__link print_removable"
            href="https://github.com/karetnikova-arina/web-task"
          >
            <IconBrandGithub color="#ced4da" style={{ marginTop: "4px" }} />
          </a>
          <a
            target="_blank"
            className="contact__link print_removable"
            href="/main.json"
          >
            <IconDatabase color="#ced4da" style={{ marginTop: "4px" }} />
          </a>
          <Input
            onClick={open}
            className="print_removable"
            icon={<IconSearch size={16} />}
            placeholder="Поиск услуг"
            radius="md"
            styles={
              width < 550
                ? {
                    wrapper: { width: "20px" },
                    input: {
                      paddingLeft: "25px!important",
                    },
                  }
                : {}
            }
            width={100}
            readOnly
          />
          <a className="contact__link" href="tel:+7 (999) 999-99-99">
            {width < 650 ? (
              <IconPhone color="#ced4da" style={{ marginLeft: "10px" }} />
            ) : (
              <Text>+7 (999) 999-99-99</Text>
            )}
          </a>
        </div>
      </header>
      <SearchModal onClose={close} open={opened} />
    </div>
  );
};
