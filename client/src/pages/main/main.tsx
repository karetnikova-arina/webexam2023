import { FC, useState } from "react";
import { SegmentedControl, Text } from "@mantine/core";
import { Title } from "@mantine/core";

import { categoriesApi } from "../../store/categories";
import { servicesApi } from "../../store/services";

import { Header } from "../../components";

import "./main.css";
import { Link } from "react-router-dom";

const categoriesDictionary = {
  all: "Все",
  face: "Лицо",
  hair: "Волосы",
  body: "Тело",
  hands: "Руки",
  foot: "Ноги",
};

export const MainPage: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const { data: categoriesData } = categoriesApi.useGetCategoriesQuery();
  const { data: servicesData } = servicesApi.useGetServicesQuery();

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  return (
    <>
      <Header />
      <main className="main__container">
        <section className="main__promo">
          <Title order={1}>
            Успейте побывать в <u>лучшем</u> <br /> салоне красоты Москвы
          </Title>
          <img
            width="320"
            className="promo__image"
            src="https://beautyflow.com.au/wp-content/uploads/2021/06/Home-Beauty-Flow-Hair-Nails-and-Beauty-Salon.jpeg"
            alt="Beauty Salon"
          />
        </section>
        <section className="main__services">
          <Title order={2} align="center" className="services__heading">
            Наши услуги
          </Title>
          <div className="services">
            {categoriesData?.categories && (
              <SegmentedControl
                className="services__categories"
                value={selectedCategory}
                onChange={handleCategoryChange}
                orientation="vertical"
                data={categoriesData.categories.map((category) => ({
                  label:
                    categoriesDictionary[
                      category.name as keyof typeof categoriesDictionary
                    ],
                  value: category.id.toString(),
                }))}
              />
            )}

            <ul className="services__list">
              {servicesData?.services
                .filter(
                  (service) =>
                    service.categoryId.toString() === selectedCategory ||
                    selectedCategory === "0"
                )
                .map((service) => (
                  <li key={service.id} className="services__item">
                    <Title order={4} className="services__title">
                      {service.name}
                    </Title>
                    <img
                      className="services__image"
                      width="200"
                      src={service.imageUrl}
                      alt=""
                    />
                    <div className="services__text">
                      <Text className="services__description">
                        {service.description}
                      </Text>
                      <Text className="services__price">{service.price} ₽</Text>
                      <Text className="services__link">
                        <Link to={`service/${service.id}`}>
                          Узнать больше...
                        </Link>
                      </Text>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </section>
        <section className="main__services"></section>
      </main>
    </>
  );
};
