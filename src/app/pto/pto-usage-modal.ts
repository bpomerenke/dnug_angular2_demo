import { Component, OnInit } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { PtoUsage } from '../pto/pto-usage';

@Component({
  moduleId: module.id,
  selector: 'pto-usage-modal',
  templateUrl: 'pto-usage-modal.html'
})

export class PtoUsageModal {
    modalTitle = "Add / Edit Item";

    constructor(private activeModal: NgbActiveModal){

    }

    close() {
        this.activeModal.close('closed');
    }
}