// import phaser class(es)
import { Scene } from 'phaser'
// import assets
import arrow_normal from '@/assets/svg/arrow-normal.svg'
import arrow_powered from '@/assets/svg/arrow-powered.svg'
import arrow_shadow from '@/assets/svg/arrow-shadow.svg'

import b_condition_normal from '@/assets/svg/b-condition-normal.svg'
import b_connector_normal from '@/assets/svg/b-connector-normal.svg'
import b_for_normal from '@/assets/svg/b-for-normal.svg'
import b_input_normal from '@/assets/svg/b-input-normal.svg'
import b_operation_normal from '@/assets/svg/b-operation-normal.svg'
import b_output_normal from '@/assets/svg/b-output-normal.svg'
import b_terminal_normal from '@/assets/svg/b-terminal-normal.svg'
import b_while_normal from '@/assets/svg/b-while-normal.svg'

import b_condition_hover from '@/assets/svg/b-condition-hover.svg'
import b_for_hover from '@/assets/svg/b-for-hover.svg'
import b_input_hover from '@/assets/svg/b-input-hover.svg'
import b_operation_hover from '@/assets/svg/b-operation-hover.svg'
import b_output_hover from '@/assets/svg/b-output-hover.svg'
import b_terminal_hover from '@/assets/svg/b-terminal-hover.svg'
import b_while_hover from '@/assets/svg/b-while-hover.svg'

import b_decision_shadow from '@/assets/svg/b-decision-shadow.svg'
import b_input_output_shadow from '@/assets/svg/b-input-output-shadow.svg'
import b_operation_shadow from '@/assets/svg/b-operation-shadow.svg'
import b_terminal_shadow from '@/assets/svg/b-terminal-shadow.svg'

import c_clear from '@/assets/svg/c-clear.svg'
import c_pause from '@/assets/svg/c-pause.svg'
import c_run from '@/assets/svg/c-run.svg'
import c_step from '@/assets/svg/c-step.svg'
import c_stop from '@/assets/svg/c-stop.svg'

import sign_branch_no from '@/assets/svg/sign-branch-no.svg'
import sign_branch_yes from '@/assets/svg/sign-branch-yes.svg'
// for Preload: load everything and move to Main Scene
export default class Preload extends Scene {
  constructor() {
    super({ key: 'Preload' });
    console.log('load scene: Preload')
  }
  preload() {
    // load everything here
    // load blocks
    this.load.image('arrow_normal', arrow_normal);
    this.load.image('arrow_powered', arrow_powered);
    this.load.image('arrow_shadow', arrow_shadow);

    this.load.image('b_condition_hover', b_condition_hover);
    this.load.image('b_condition_normal', b_condition_normal);

    this.load.image('b_connector_normal', b_connector_normal);

    this.load.image('b_decision_shadow', b_decision_shadow);

    this.load.image('b_for_hover', b_for_hover);
    this.load.image('b_for_normal', b_for_normal);

    this.load.image('b_input_hover', b_input_hover);
    this.load.image('b_input_normal', b_input_normal);

    this.load.image('b_input_output_shadow', b_input_output_shadow);

    this.load.image('b_operation_hover', b_operation_hover);
    this.load.image('b_operation_normal', b_operation_normal);
    this.load.image('b_operation_shadow', b_operation_shadow);

    this.load.image('b_output_hover', b_output_hover);
    this.load.image('b_output_normal', b_output_normal);

    this.load.image('b_terminal_hover', b_terminal_hover);
    this.load.image('b_terminal_normal', b_terminal_normal);
    this.load.image('b_terminal_shadow', b_terminal_shadow);

    this.load.image('b_while_hover', b_while_hover);
    this.load.image('b_while_normal', b_while_normal);

    this.load.image('c_clear', c_clear);
    this.load.image('c_pause', c_pause);
    this.load.image('c_run', c_run);
    this.load.image('c_step', c_step);
    this.load.image('c_stop', c_stop);
    
    this.load.image('sign_branch_no', sign_branch_no);
    this.load.image('sign_branch_yes', sign_branch_yes);
    // load fonts
    
  }
  create() {
    this.scene.start('Main')
  }
}