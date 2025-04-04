import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';
import { registerUser } from '../../../entities/registerUser';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
    private toastr: CustomToastrService
  ) {

  }
  frm: FormGroup;
  ngOnInit() {
    this.frm = this.formBuilder.group({
      adSoyad: ["", [
        Validators.required,
        Validators.maxLength(20),
        Validators.minLength(2)
      ]],
      kullaniciAdi: ["", [
        Validators.required,
        Validators.maxLength(23),
        Validators.minLength(2)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      sifre: ["", [
        Validators.required,
      ]],
      sifreTekrar: ["", [
        Validators.required,
      ]]
    })
  }
  get Component() {
    return this.frm.controls;
  }
  submitted: boolean = false;
  onSubmit(data: registerUser) {
    if (this.frm.invalid) {
      this.submitted = true;
      if (data.sifre !== data.sifreTekrar) {
        this.toastr.message("Şifreler Uyuşmuyor", "HATALI ŞİFRE!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.BottomCenter
        })
        console.log("Şifre DOĞRULAMA GEÇERSİZ!");
        return;
      }
      console.log("GEÇERSİZ KULLANICI KAYDI!");
      return;
    }
    else if (data.sifre === data.sifreTekrar) {
      console.log("GEÇERLİ KULLANICI KAYDI!");
      this.submitted = false;
    } else {
      console.log("GEÇERSİZ KULLANICI KAYDI");
      return;
    }
  }
}