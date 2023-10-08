// Pack 10
import RiskyText from "./banners/RiskyText.png";
import AwShirt2 from "./banners/AwShirt2.png";
import NopusOpus from "./banners/NopusOpus.png";
import TimeTrivia from "./banners/TimeTrivia.jpg";
import UsThem from "./banners/UsThem.png";

// Pack 9
import AntiqueGame from "./banners/AntiqueGame.webp";
import Fibbage4 from "./banners/Fibbage4.webp";
import Lineup from "./banners/Lineup.webp";
import MakeFriends from "./banners/MakeFriends.webp";
import RangeGame from "./banners/RangeGame.webp";

// Pack 8
import DrawfulAnimate from "./banners/DrawfulAnimate.webp";
import JobGame from "./banners/JobGame.webp";
import MurderDetectives from "./banners/MurderDetectives.webp";
import SurveyBomb from "./banners/SurveyBomb.webp";
import TheWheel from "./banners/TheWheel.webp";

// Pack 7
import BlankyBlank from "./banners/BlankyBlank.webp";
import Everyday from "./banners/Everyday.webp";
import JackboxTalks from "./banners/JackboxTalks.webp";
import Quiplash3 from "./banners/Quiplash3.webp";
import WorldChampions from "./banners/WorldChampions.webp";

// Pack 6
import Jokeboat from "./banners/Jokeboat.webp";
import PushTheButton from "./banners/PushTheButton.webp";
import Ridictionary from "./banners/Ridictionary.webp";
import RoleModels from "./banners/RoleModels.webp";
import TriviaDeath2 from "./banners/TriviaDeath2.webp";

// Pack 5
import PatentlyStupid from "./banners/PatentlyStupid.webp";
import RapBattle from "./banners/RapBattle.webp";
import SlingShoot from "./banners/SlingShoot.webp";
import SplitTheRoom from "./banners/SplitTheRoom.webp";
import YDKJ2018 from "./banners/YDKJ2018.webp";

// Pack 4
import Bracketeering from "./banners/Bracketeering.webp";
import Fibbage3 from "./banners/Fibbage3.webp";
import MonsterMingle from "./banners/MonsterMingle.webp";
import Overdrawn from "./banners/Overdrawn.webp";
import SurviveTheInternet from "./banners/SurviveTheInternet.webp";

// Pack 3
import AwShirt from "./banners/AwShirt.webp";
import FakinIt from "./banners/FakinIt.webp";
import PollPosition from "./banners/PollPosition.webp";
import Quiplash2 from "./banners/Quiplash2.webp";
import TriviaDeath from "./banners/TriviaDeath.webp";

// Pack 2
import Auction from "./banners/Auction.webp";
import BombInterns from "./banners/BombInterns.webp";
import Earwax from "./banners/Earwax.webp";
import Fibbage2 from "./banners/Fibbage2.webp";
import QuiplashXL from "./banners/QuiplashXL.webp";

// Pack 1
import Drawful from "./banners/Drawful.webp";
import YDKJ2015 from "./banners/YDKJ2015.webp";
import LieSwatterParty from "./banners/LieSwatterParty.webp";
import WordSpud from "./banners/WordSpud.webp";
import FibbageXLParty from "./banners/FibbageXL.party.webp";

// Standalone
import fibbageStandalone from "./banners/FibbageXL.standalone.webp";
import quiplash from "./banners/quiplash.webp";
import quiplash2international from "./banners/quiplash2international.webp";
import drawful2 from "./banners/drawful2.webp";

// ydkj2011
import ydkj2011 from "./banners/ydkj2011.jpg";

// jack ios
// import jackFacebook from "./banners/jackFacebook.webp";
import jackiOS from "./banners/jackiOS.png";

export type BundleItem = {
    id: string;
    name: string;
    games: GameItem[];
};

export type GameItem = {
    id: string;
    name: string;
    version: number;
    status?: Status;
    banner?: string;
};

export enum Status {
    Unsupported = "unsupported",
    Incomplete = "incomplete"
}

const BundleList: BundleItem[] = [
    {
        id: "pp10-demo",
        name: "The Jackbox Party Pack 10 Demo",
        games: [
            { id: "RiskyText", name: "FixyText", version: 2, banner: RiskyText },
            { id: "AwShirt2", name: "Tee K.O. 2", version: 2, status: Status.Incomplete, banner: AwShirt2 },
            { id: "NopusOpus", name: "Dodo Re Mi", version: 2, banner: NopusOpus },
            { id: "TimeTrivia", name: "Timejinx", version: 2, status: Status.Incomplete, banner: TimeTrivia },
            { id: "UsThem", name: "Hypnotorious", version: 2, status: Status.Incomplete, banner: UsThem },
        ]
    },
    /* {
        id: "pp9-demo",
        name: "The Jackbox Party Pack 9 Demo",
        games: [
            { id: "AntiqueGame", name: "Junktopia", version: 2, banner: AntiqueGame },
            { id: "Fibbage4", name: "Fibbage 4", status: Status.Incomplete, banner: Fibbage4 },
            { id: "Lineup", name: "Quixort", version: 2, banner: Lineup },
            { id: "MakeFriends", name: "Roomerang", status: Status.Incomplete, banner: MakeFriends },
            { id: "RangeGame", name: "Nonsensory", version: 2, banner: RangeGame }
        ]
    }, */
    {
        id: "pp9",
        name: "The Jackbox Party Pack 9",
        games: [
            { id: "AntiqueGame", name: "Junktopia", version: 2, banner: AntiqueGame },
            { id: "Fibbage4", name: "Fibbage 4", version: 2, banner: Fibbage4 },
            { id: "Lineup", name: "Quixort", version: 2, banner: Lineup },
            { id: "MakeFriends", name: "Roomerang", version: 2, banner: MakeFriends },
            { id: "RangeGame", name: "Nonsensory", version: 2, banner: RangeGame }
            // { id: "AntiqueGame", name: "Junktopia", status: Status.Incomplete, banner: AntiqueGame },
            // { id: "Fibbage4", name: "Fibbage 4", status: Status.Incomplete, banner: Fibbage4 },
            // { id: "Lineup", name: "Quixort", status: Status.Incomplete, banner: Lineup },
            // { id: "MakeFriends", name: "Roomerang", status: Status.Incomplete, banner: MakeFriends },
            // { id: "RangeGame", name: "Nonsensory", status: Status.Incomplete, banner: RangeGame }
        ]
    },
    {
        id: "tjsp",
        name: "The Jackbox Party Starter",
        games: [
            { id: "AwShirt", name: "Tee K.O.", version: 2, banner: AwShirt },
            { id: "Quiplash3", name: "Quiplash 3", version: 2, banner: Quiplash3 },
            { id: "triviadeath2", name: "Trivia Murder Party 2", version: 2, banner: TriviaDeath2 }
        ]
    },
    {
        id: "pp8",
        name: "The Jackbox Party Pack 8",
        games: [
            { id: "DrawfulAnimate", name: "Drawful Animate", version: 1, banner: DrawfulAnimate },
            { id: "JobGame", name: "Job Job", version: 1, banner: JobGame },
            { id: "MurderDetectives", name: "Weapons Drawn", version: 1, banner: MurderDetectives },
            { id: "SurveyBomb", name: "The Poll Mine", version: 1, banner: SurveyBomb },
            { id: "TheWheel", name: "The Wheel of Enormous Proportions", version: 1, banner: TheWheel }
        ]
    },
    {
        id: "pp7",
        name: "The Jackbox Party Pack 7",
        games: [
            { id: "BlankyBlank", name: "Blather \u2018Round", version: 1, banner: BlankyBlank },
            { id: "Everyday", name: "The Devils and the Details", version: 1, banner: Everyday },
            { id: "JackboxTalks", name: "Talking Points", version: 1, banner: JackboxTalks },
            { id: "Quiplash3", name: "Quiplash 3", version: 1, banner: Quiplash3 },
            { id: "WorldChampions", name: "Champ\u2019d Up", version: 1, banner: WorldChampions }
        ]
    },
    {
        id: "pp6",
        name: "The Jackbox Party Pack 6",
        games: [
            { id: "Jokeboat", name: "Joke Boat", version: 1, banner: Jokeboat },
            { id: "PushTheButton", name: "Push The Button", version: 1, banner: PushTheButton },
            { id: "Ridictionary", name: "Dictionarium", version: 1, banner: Ridictionary },
            { id: "RoleModels", name: "Role Models", version: 1, banner: RoleModels },
            { id: "TriviaDeath2", name: "Trivia Murder Party 2", version: 1, banner: TriviaDeath2 }
        ]
    },
    {
        id: "pp5",
        name: "The Jackbox Party Pack 5",
        games: [
            { id: "PatentlyStupid", name: "Patently Stupid", version: 1, banner: PatentlyStupid },
            { id: "RapBattle", name: "Mad Verse City", version: 1, banner: RapBattle },
            { id: "SlingShoot", name: "Zeeple Dome", version: 1, banner: SlingShoot },
            { id: "SplitTheRoom", name: "Split The Room", version: 1, banner: SplitTheRoom },
            { id: "YDKJ2018", name: "YOU DON\u2019T KNOW JACK: Full Stream", version: 1, banner: YDKJ2018 }
        ]
    },
    {
        id: "pp4",
        name: "The Jackbox Party Pack 4",
        games: [
            { id: "Bracketeering", name: "Bracketeering", version: 1, banner: Bracketeering },
            { id: "Fibbage3", name: "Fibbage 3", version: 1, banner: Fibbage3 },
            { id: "MonsterMingle", name: "Monster Seeking Monster", version: 1, banner: MonsterMingle },
            { id: "Overdrawn", name: "Civic Doodle", version: 1, banner: Overdrawn },
            { id: "SurviveTheInternet", name: "Survive The Internet", version: 1, banner: SurviveTheInternet }
        ]
    },
    {
        id: "pp3",
        name: "The Jackbox Party Pack 3",
        games: [
            { id: "AwShirt", name: "Tee K.O.", version: 1, banner: AwShirt },
            { id: "FakinIt", name: "Fakin\u2019 It", version: 1, banner: FakinIt },
            { id: "PollPosition", name: "Guesspionage", version: 1, banner: PollPosition },
            { id: "Quiplash2", name: "Quiplash 2", version: 1, banner: Quiplash2 },
            { id: "TriviaDeath", name: "Trivia Murder Party", version: 1, banner: TriviaDeath }
        ]
    },
    {
        id: "pp2",
        name: "The Jackbox Party Pack 2",
        games: [
            { id: "Auction", name: "Bidiots", version: 2, banner: Auction },
            { id: "BombInterns", name: "Bomb Corp.", version: 2, banner: BombInterns },
            { id: "Earwax", name: "Earwax", version: 2, banner: Earwax },
            { id: "Fibbage2", name: "Fibbage 2", version: 2, banner: Fibbage2 },
            { id: "Quiplash", name: "Quiplash XL", version: 2, banner: QuiplashXL }
        ]
    },
    {
        id: "pp1",
        name: "The Jackbox Party Pack",
        games: [
            { id: "Drawful", name: "Drawful", version: 1, banner: Drawful },
            { id: "YDKJ2015", name: "YOU DON\u2019T KNOW JACK 2015", version: 1, banner: YDKJ2015 },
            { id: "LieSwatterParty", name: "Lie Swatter", status: Status.Unsupported, version: -1, banner: LieSwatterParty },
            { id: "WordSpud", name: "Word Spud", status: Status.Unsupported, version: -1, banner: WordSpud },
            { id: "Fibbage", name: "Fibbage XL", version: 1, banner: FibbageXLParty }
        ]
    },
    {
        id: "standalone",
        name: "Standalone Titles",
        games: [
            { id: "fibbage", name: "Fibbage XL", version: 1, banner: fibbageStandalone },
            { id: "quiplash", name: "Quiplash", version: 1, banner: quiplash },
            { id: "quiplash2international", name: "Quiplash 2 InterLASHional", version: 1, banner: quiplash2international },
            { id: "drawful2", name: "Drawful 2", version: 1, banner: drawful2 }
        ]
    },
    {
        id: "ydkj2011",
        name: "YOU DON\u2019T KNOW JACK\u00ae",
        games: [
            { id: "menutest", name: "(PC) YDKJ\u00ae: Menu & Lobby", version: 1, banner: ydkj2011 },
            { id: "episode", name: "(PC) YDKJ\u00ae: Main Game", version: 1, banner: ydkj2011 },
            { id: "xbox-menutest", name: "(Xbox 360) YDKJ\u00ae: Menu & Lobby", version: 1, banner: ydkj2011 },
            { id: "xbox-episode", name: "(Xbox 360) YDKJ\u00ae: Main Game", version: 1, banner: ydkj2011 },
        ]
    },
    {
        id: "jack-ios",
        name: "YOU DON\u2019T KNOW JACK\u00ae (iOS)",
        games: [
            { id: "main", name: "YDKJ iOS", version: 1, banner: jackiOS },
            { id: "facebook", name: "YDKJ Facebook for iOS", version: 1, banner: jackiOS }
        ]
    }
];

export default BundleList;