import CatAdult from '../assets/images/character/cat/cat-adult.png';
import CatBaby from '../assets/images/character/cat/cat-baby.png';
import CatEgg from '../assets/images/character/cat/cat-egg.png';
import CatTeen from '../assets/images/character/cat/cat-teen.png';
import DogAdult from '../assets/images/character/dog/dog-adult.png';
import DogBaby from '../assets/images/character/dog/dog-baby.png';
import DogEgg from '../assets/images/character/dog/dog-egg.png';
import DogTeen from '../assets/images/character/dog/dog-teen.png';
import Gone from '../assets/images/character/gone.png';
import HamsterAdult from '../assets/images/character/hamster/hamster-adult.png';
import HamsterBaby from '../assets/images/character/hamster/hamster-baby.png';
import HamsterEgg from '../assets/images/character/hamster/hamster-egg.png';
import HamsterTeen from '../assets/images/character/hamster/hamster-teen.png';
import RabbitAdult from '../assets/images/character/rabbit/rabbit-adult.png';
import RabbitBaby from '../assets/images/character/rabbit/rabbit-baby.png';
import RabbitEgg from '../assets/images/character/rabbit/rabbit-egg.png';
import RabbitTeen from '../assets/images/character/rabbit/rabbit-teen.png';
import TitAdult from '../assets/images/character/tit/tit-adult.png';
import TitBaby from '../assets/images/character/tit/tit-baby.png';
import TitEgg from '../assets/images/character/tit/tit-egg.png';
import TitTeen from '../assets/images/character/tit/tit-teen.png';

type CharacterStage = 'egg' | 'baby' | 'teen' | 'adult' | 'gone';

type CharacterImageSet = {
  [key in CharacterStage]: string;
};

export const characterImageMap: Record<string, CharacterImageSet> = {
  // 미루찌
  DZ1OHxn48Z5zRwtt50TP: {
    egg: HamsterEgg,
    baby: HamsterBaby,
    teen: HamsterTeen,
    adult: HamsterAdult,
    gone: Gone,
  },
  // 늦잠멍
  YYlClvXJADbJO9ru1VG3: {
    egg: DogEgg,
    baby: DogBaby,
    teen: DogTeen,
    adult: DogAdult,
    gone: Gone,
  },
  // 레이토
  bEFnSlfFSbK9QVq0arjT: {
    egg: RabbitEgg,
    baby: RabbitBaby,
    teen: RabbitTeen,
    adult: RabbitAdult,
    gone: Gone,
  },
  // 나중삐
  cJb5qHB1Z7GFm79SCitA: {
    egg: TitEgg,
    baby: TitBaby,
    teen: TitTeen,
    adult: TitAdult,
    gone: Gone,
  },
  // 미루냥
  t0vhk3H3NCZACFLL7c0s: {
    egg: CatEgg,
    baby: CatBaby,
    teen: CatTeen,
    adult: CatAdult,
    gone: Gone,
  },
};
