import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';  // <-- Importa ReactiveFormsModule
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { CommonModule } from '@angular/common'; // 👈 importa esto
import { inject } from '@angular/core';
import { collection, getDocs } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router'; // 👈 importa esto
@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  registerForm: FormGroup;
  profileImage: File | null = null;

  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private route = inject(ActivatedRoute); // 👈 inyecta ActivatedRoute
  private router = inject(Router); // 👈 Inyecta Router


  constructor() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', Validators.required],
      description: ['', Validators.required],
      skills: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      const roleFromURL = params['role'];
      if (roleFromURL) {
        this.registerForm.get('role')?.setValue(roleFromURL);
      }
    });

  }

  async onSubmit() {
    if (this.registerForm.invalid) return;

    const { email, password, ...otherData } = this.registerForm.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;

      let imageUrl = '';
      if (this.profileImage) {
      }

      await setDoc(doc(this.firestore, 'user', userId), {
        ...otherData,
        email,
        imageUrl,
        createdAt: new Date()
      });



      alert('Usuario registrado con éxito ✅');
      this.router.navigate(['/landing-page'], { queryParams: { role: otherData.role } });

    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Error al registrar: ' + (error as any).message);
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.profileImage = file;
  }
}
