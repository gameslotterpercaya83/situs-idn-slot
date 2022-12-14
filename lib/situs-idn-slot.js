'use babel';

import SitusIdnSlotView from './situs-idn-slot-view';
import { CompositeDisposable } from 'atom';

export default {

  situsIdnSlotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.situsIdnSlotView = new SitusIdnSlotView(state.situsIdnSlotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.situsIdnSlotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'situs-idn-slot:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.situsIdnSlotView.destroy();
  },

  serialize() {
    return {
      situsIdnSlotViewState: this.situsIdnSlotView.serialize()
    };
  },

  toggle() {
    console.log('SitusIdnSlot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
