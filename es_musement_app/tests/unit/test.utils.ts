import { MusementItem } from "@/models/musement.models";
import EventItem from "@/models/event.item";
import Vuex, { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import CartStore from "@/store/cart/cart-store";
import UserDataStore from "@/store/user/user-data-store";
import AppDataStore from "@/store/app-data/app-data-store";
import ShowcaseStore from "@/store/showcase/showcase-store";
import WishlistStore from "@/store/wishlist/wishlist-store";

export class TestUtils {
  public static get store(): Store<CartStore> {
    return new Vuex.Store({
      modules: {
        cart: getModule(CartStore),
        user: getModule(UserDataStore),
        appdata: getModule(AppDataStore),
        showcase: getModule(ShowcaseStore),
        wishlist: getModule(WishlistStore)
      }
    });
  }

  public static fakeEvent = (id: string): EventItem => {
    return {
      tickets: 1,
      title: "test",
      image: "myImg",
      finalPriceFormatted: "€ 10.00",
      originalPrice: 12,
      discounted: true,
      uuid: id,
      description: "desc-test",
      finalPrice: 10
    };
  };

  public static generateEventItems = (num: number, prefix = "e"): EventItem[] => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(TestUtils.fakeEvent(`${prefix}-${i}`));
    }
    return result;
  };

  public static fakeMusementItem = (id: string): MusementItem => {
    return {
      operational_days: "Martedì, venerdì, domenica",
      max_confirmation_time: "P0D",
      cutoff_time: "P1D",
      booking_type: "CALENDAR-TIMESLOTS",
      uuid: id,
      city: {
        id: 3,
        name: "Firenze",
        country: {
          id: 82,
          name: "Italia",
          iso_code: "IT"
        },
        cover_image_url:
          "https://images.musement.com/cover/0002/39/top-cityscape-view-on-the-dome-of-santa-maria-del-fiori-florence-jpg_header-138319.jpeg",
        url: "https://www.musement.com/it/firenze/",
        time_zone: "Europe/Rome"
      },
      saves: 0,
      title: "Tour di Firenze con accesso salta fila agli Uffizi e David",
      relevance: 1,
      relevance_venue: 1,
      must_see: true,
      last_chance: false,
      top_seller: false,
      voucher_access_usage: "MOBILE",
      temporary: false,
      description:
        "Scopri il meglio che Firenze in poche ore! Salta la fila per la Galleria dell'Accademia, gli Uffizi, e passeggia verso Piazza del Duomo e Palazzo Vecchio.",
      about:
        "Il tuo tour inizia presto, vicino alla Galleria dell'Accademia, dove la tua guida locale ti fornirà i biglietti per andare direttamente all'interno e vedere il \"David\" di Michelangelo prima che la folla si presenti. Mentre ti troverai sotto di lui, la tua guida ti racconterà la storia della sua creazione, così come la storia del suo creatore -- il genio, Michelangelo Buonarroti. Uscendo, ti fermerai dagli \"Schiavi\" incompiuti di Michelangelo per vedere i segni evolutivi del suo processo artistico e per saperne di più sulla lotta che ha consumato gran parte della sua vita.Con una passeggiata di 15 minuti, ti dirigerai alla Galleria degli Uffizi, passeggiando per la città. Una volta raggiunta la Piazza del Duomo, ti troverai all'ombra di una delle cupole più grandi del mondo. Vedrai anche le famose Porte del Battistero di Firenze, fuse in bronzo da Lorenzo Ghiberti e ammirate tanto da Michelangelo, il quale le battezzò \"Porte del Paradiso\". Vedrai anche Palazzo Vecchio, uno dei principali palazzi della potente famiglia dei Medici, oltre alla galleria di sculture all'aperto di Palazzo della Signoria.Infine, ti dirigerai all'interno della Galleria degli Uffizi, sede della più grande collezione al mondo di dipinti del Rinascimento. Ti verrà mostrato un elenco dei dipinti più significativi, interessanti e semplicemente belli del museo.La disposizione delle opere che scoprirai è organizzata cronologicamente, quindi la tua visita si trasforma in un corso accelerato nello sviluppo dell'arte occidentale, tra cui opere meno note di artisti come Duccio e Giotto, e classici in buona fede di artisti come Michelangelo, Botticelli, Raffaello e Leonardo da Vinci . Quando finirai, non vedrai solo un museo d'arte, avrai acquisito una migliore comprensione dell'arte europea.Con il tour che termina poco prima di pranzo, la guida ti darà volentieri consigli su dove mangiare e cosa vedere se vorrai continuare a esplorare.",
      meeting_point:
        "Questa è una piazza centrale adiacente a Via degli Arazzieri e Via Giorgio la Pira, a nord della Cattedrale di Santa Maria del Fiore",
      validity: "P0D",
      has_price_info_on_date: true,
      open: false,
      ticket_not_included: false,
      likely_to_sell_out: false,
      special_offer: false,
      exclusive: false,
      best_price: false,
      daily: false,
      languages: [
        {
          code: "en",
          name: "Inglese"
        }
      ],
      group_size: [
        {
          code: "group",
          name: "Tour di gruppo"
        }
      ],
      food: [],
      services: [],
      features: [
        {
          code: "istant",
          name: "CONFERMA ISTANTANEA"
        },
        {
          code: "skip",
          name: "SALTA LA CODA"
        }
      ],
      is_available_today: false,
      is_available_tomorrow: false,
      cover_image_url:
        "https://images.musement.com/cover/0002/30/david-michelangelo_header-129525.jpeg",
      service_fee: {
        currency: "EUR",
        value: 0,
        formatted_value: "€ 0.00",
        formatted_iso_value: "0,00 €"
      },
      retail_price: {
        currency: "EUR",
        value: 95,
        formatted_value: "€ 95.00",
        formatted_iso_value: "95,00 €"
      },
      retail_price_without_service_fee: {
        currency: "EUR",
        value: 95,
        formatted_value: "€ 95.00",
        formatted_iso_value: "95,00 €"
      },
      original_retail_price_without_service_fee: {
        currency: "EUR",
        value: 95,
        formatted_value: "€ 95.00",
        formatted_iso_value: "95,00 €"
      },
      original_retail_price: {
        currency: "EUR",
        value: 95,
        formatted_value: "€ 95.00",
        formatted_iso_value: "95,00 €"
      },
      discount: 0,
      categories: [
        {
          id: 13,
          name: "Musei",
          level: "1",
          code: "museums",
          event_image_url:
            "https://images.musement.com/cover/0002/51/thumb_150564_cover_header.jpeg",
          cover_image_url:
            "https://images.musement.com/category/0003/24/thumb_223579_category_header.jpeg",
          url: "https://www.musement.com/it/firenze/musei-c/"
        },
        {
          id: 76,
          name: "Attrazioni e monumenti",
          level: "1",
          code: "attractions-and-monuments",
          event_image_url:
            "https://images.musement.com/cover/0056/52/thumb_5551854_cover_header.jpeg",
          cover_image_url:
            "https://images.musement.com/cover/0056/52/thumb_5551854_cover_header.jpeg",
          url: "https://www.musement.com/it/firenze/attrazioni-e-monumenti-c/"
        },
        {
          id: 92,
          name: "Tour della città",
          level: "1",
          code: "city-tours",
          event_image_url:
            "https://images.musement.com/cover/0102/23/thumb_10122196_cover_header.jpeg",
          cover_image_url:
            "https://images.musement.com/cover/0102/23/thumb_10122196_cover_header.jpeg",
          url: "https://www.musement.com/it/firenze/tour-della-citta-c/"
        }
      ],
      reviews_number: 1,
      reviews_avg: 4,
      reviews_aggregated_info: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 1,
        "5": 0
      },
      latitude: 43.7780443,
      longitude: 11.2588809,
      url:
        "https://www.musement.com/it/firenze/tour-di-firenze-con-accesso-salta-fila-agli-uffizi-e-david-50368/",
      flavours: [
        {
          id: 111,
          name: "Tour guidato",
          active: true,
          slug: "tour-guidato"
        }
      ],
      verticals: [
        {
          id: 1,
          name: "Arte e musei",
          active: true,
          code: "arts-culture",
          slug: "arte-e-musei",
          url: "https://www.musement.com/it/arte-e-musei-t/",
          meta_title: "Scopri il meraviglioso mondo dell'arte e dei musei",
          meta_description:
            "Scopri le opere d'arte più famose del mondo con Musement, ammira i meravigliosi dipinti rinascimentali e le sculture rivoluzionarie delle avanguardie artistiche.",
          cover_image_url:
            "https://images.musement.com/vertical/0001/30/art-and-culture_header-29023.jpeg?w=540",
          relevance: 100
        },
        {
          id: 2,
          name: "Tour e attrazioni",
          active: true,
          code: "sightseeing",
          slug: "tour-e-attrazioni",
          url: "https://www.musement.com/it/tour-e-attrazioni-t/",
          meta_title: "Scopri i migliori tour e le attrazioni più belle",
          meta_description:
            "Esplora ogni città con Musement come se fossi uno del posto. Non aspettare in fila per visitare le attrazioni più famose del mondo e scopri i luoghi meno conosciuti.",
          cover_image_url:
            "https://images.musement.com/vertical/0001/31/sightseeing-00-jpg_header-30549.jpeg?w=540",
          relevance: 90
        }
      ],
      giftable: true,
      buy_multiplier: 1,
      duration_range: { max: "", min: "" },
      emergency_phone_number: "",
      ticket: false,
      free_cancellation: true
    };
  };

  public static generateMusementItems = (num: number, prefix = "m"): MusementItem[] => {
    const result = [];
    for (let i = 0; i < num; i++) {
      result.push(TestUtils.fakeMusementItem(`${prefix}-${i}`));
    }
    return result;
  };
}
