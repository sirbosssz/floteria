// import phaser class(es)
import { Scene } from "phaser";
// import assets
import arrow_normal from "@/assets/svg/arrow_normal.svg";

import block_start from "@/assets/svg/block_start.svg";
import block_start_hover from "@/assets/svg/block_start_hover.svg";
import block_end from "@/assets/svg/block_end.svg";
import block_end_hover from "@/assets/svg/block_end_hover.svg";

import block_order_dessert from "@/assets/svg/block_order_dessert.svg";
import block_order_dessert_hover from "@/assets/svg/block_order_dessert_hover.svg";
import block_order_drink from "@/assets/svg/block_order_drink.svg";
import block_order_drink_hover from "@/assets/svg/block_order_drink_hover.svg";
import block_ask_order from "@/assets/svg/block_ask_order.svg";
import block_ask_order_hover from "@/assets/svg/block_ask_order_hover.svg";
import block_count_customer from "@/assets/svg/block_count_customer.svg";
import block_count_customer_hover from "@/assets/svg/block_count_customer_hover.svg";

import block_serve_dessert from "@/assets/svg/block_serve_dessert.svg";
import block_serve_dessert_hover from "@/assets/svg/block_serve_dessert_hover.svg";
import block_serve_drink from "@/assets/svg/block_serve_drink.svg";
import block_serve_drink_hover from "@/assets/svg/block_serve_drink_hover.svg";
import block_tell_price from "@/assets/svg/block_tell_price.svg";
import block_tell_price_hover from "@/assets/svg/block_tell_price_hover.svg";

import block_dessert_price from "@/assets/svg/block_dessert_price.svg";
import block_dessert_price_hover from "@/assets/svg/block_dessert_price_hover.svg";
import block_drink_price from "@/assets/svg/block_drink_price.svg";
import block_drink_price_hover from "@/assets/svg/block_drink_price_hover.svg";
import block_combine_price from "@/assets/svg/block_combine_price.svg";
import block_combine_price_hover from "@/assets/svg/block_combine_price_hover.svg";

import block_condition_isdessert from "@/assets/svg/block_condition_isdessert.svg";
import block_condition_isdessert_hover from "@/assets/svg/block_condition_isdessert_hover.svg";
import block_condition_isdessert_full from "@/assets/svg/block_condition_isdessert_full.svg";
import block_condition_price from "@/assets/svg/block_condition_price.svg";
import block_condition_price_hover from "@/assets/svg/block_condition_price_hover.svg";
import block_condition_price_full from "@/assets/svg/block_condition_price_full.svg";

import output_lab from "@/assets/svg/output-lab.svg";
import output_lesson from "@/assets/svg/output-lesson.svg";

import c_clear from "@/assets/svg/c-clear.svg";
import c_pause from "@/assets/svg/c-pause.svg";
import c_run from "@/assets/svg/c-run.svg";
import c_step from "@/assets/svg/c-step.svg";
import c_stop from "@/assets/svg/c-stop.svg";

import o_cocoa from "@/assets/svg/o_cocoa.svg";
import o_cocoa_cup from "@/assets/svg/o_cocoa_cup.svg";
import o_coffee from "@/assets/svg/o_coffee.svg";
import o_coffee_cup from "@/assets/svg/o_coffee_cup.svg";
import o_tea from "@/assets/svg/o_tea.svg";
import o_tea_cup from "@/assets/svg/o_tea_cup.svg";
import o_bread from "@/assets/svg/o_bread.svg";
import o_cookies from "@/assets/svg/o_cookies.svg";
import o_croissant from "@/assets/svg/o_croissant.svg";
import o_textbox from "@/assets/svg/o_textbox.svg";

// for Preload: load everything and move to Main Scene
export default class Preload extends Scene {
  constructor() {
    super({ key: "Preload" });
    console.log("load scene: Preload");
  }
  preload() {
    // load everything here
    // load blocks
    this.load.image("arrow_normal", arrow_normal);

    this.load.image("block_start", block_start);
    this.load.image("block_start_hover", block_start_hover);
    this.load.image("block_end", block_end);
    this.load.image("block_end_hover", block_end_hover);

    this.load.image("block_order_dessert", block_order_dessert);
    this.load.image("block_order_dessert_hover", block_order_dessert_hover);
    this.load.image("block_order_drink", block_order_drink);
    this.load.image("block_order_drink_hover", block_order_drink_hover);
    this.load.image("block_ask_order", block_ask_order);
    this.load.image("block_ask_order_hover", block_ask_order_hover);
    this.load.image("block_count_customer", block_count_customer);
    this.load.image("block_count_customer_hover", block_count_customer_hover);

    this.load.image("block_serve_dessert", block_serve_dessert);
    this.load.image("block_serve_dessert_hover", block_serve_dessert_hover);
    this.load.image("block_serve_drink", block_serve_drink);
    this.load.image("block_serve_drink_hover", block_serve_drink_hover);
    this.load.image("block_tell_price", block_tell_price);
    this.load.image("block_tell_price_hover", block_tell_price_hover);

    this.load.image("block_dessert_price", block_dessert_price);
    this.load.image("block_dessert_price_hover", block_dessert_price_hover);
    this.load.image("block_drink_price", block_drink_price);
    this.load.image("block_drink_price_hover", block_drink_price_hover);
    this.load.image("block_combine_price", block_combine_price);
    this.load.image("block_combine_price_hover", block_combine_price_hover);

    this.load.image("block_condition_isdessert", block_condition_isdessert);
    this.load.image("block_condition_isdessert_hover", block_condition_isdessert_hover);
    this.load.image("block_condition_isdessert_full", block_condition_isdessert_full);
    this.load.image("block_condition_price", block_condition_price);
    this.load.image("block_condition_price_hover", block_condition_price_hover);
    this.load.image("block_condition_price_full", block_condition_price_full);

    this.load.image("c_clear", c_clear);
    this.load.image("c_pause", c_pause);
    this.load.image("c_run", c_run);
    this.load.image("c_step", c_step);
    this.load.image("c_stop", c_stop);

    this.load.image("output_lab", output_lab);
    this.load.image("output_lesson", output_lesson);

    this.load.image("o_cocoa", o_cocoa);
    this.load.image("โกโก้", o_cocoa_cup);
    this.load.image("o_coffee", o_coffee);
    this.load.image("กาแฟ", o_coffee_cup);
    this.load.image("ชา", o_tea);
    this.load.image("o_tea_cup", o_tea_cup);
    this.load.image("ขนมปัง", o_bread);
    this.load.image("คุ๊กกี้", o_cookies);
    this.load.image("ครัวซองค์", o_croissant);
    this.load.image("o_textbox", o_textbox);

    this.load.script(
      "webfont",
      "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"
    );
  }
  create() {
    this.scene.start("Main");
  }
}
