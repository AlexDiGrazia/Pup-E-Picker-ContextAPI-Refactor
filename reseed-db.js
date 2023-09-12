import * as _ from "lodash-es";
import { writeFileSync } from "fs";
import { faker } from "@faker-js/faker";
const capitalize = _.capitalize;
const range = _.range;
const sample = _.sample;

const dogAmount = 20;
const images = [
  "../public/assets/blue-heeler.png",
  "../public/assets/chihuahua.avif",
  "../public/assets/boxer.png",
  "../public/assets/corgi.png",
  "../public/assets/cowardly.png",
  "../public/assets/dalmation.png",
];
const db = {
  dogs: range(dogAmount).map((_, id) => ({
    name: `${capitalize(faker.name.firstName())}`,
    image: sample(images),
    description: faker.random.words(sample([8, 5, 7])),
    isFavorite: sample([true, false]),
    id,
  })),
};

writeFileSync("db.json", JSON.stringify(db), { encoding: "utf-8" });
