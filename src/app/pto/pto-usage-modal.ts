import { Input, Component, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PtoUsage } from '../pto/pto-usage';

@Component({
  moduleId: module.id,
  selector: 'pto-usage-modal',
  templateUrl: 'pto-usage-modal.html'
})

export class PtoUsageModal {
    modalTitle = "Add / Edit Item";
    item: PtoUsage = new PtoUsage();

    constructor(private activeModal: NgbActiveModal){

    }

    save() {
        this.activeModal.close(this.item);
    }
    close() {
        this.activeModal.dismiss('cancel');
    }
}