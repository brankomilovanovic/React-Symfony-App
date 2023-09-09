import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    sr: {
        base: {
            profile: {
                name: 'Ime',
                surname: 'Prezime',
                email: 'E-Mail',
                username: 'Korisnicko ime',
                password: 'Sifra',
                role: 'Pozicija',
                userType: 'Tip naloga'
            },
            table: {
                actions: 'Akcije',
                edit: 'Uredi',
                delete: 'Obrisi'
            },
            filter: {
                sort: {
                    sortType: 'Nacin sortiranja',
                    datetimeDesc: 'Od novijeg prema starijem',
                    datetimeAsc: 'Od starijeg prema novijem',
                }
            },
            role: {
                user: 'Korisnik',
                moderator: 'Moderator',
                admin: 'Admin'
            },
            userType: {
                individual: 'Individual',
                company: 'Company',
            }
        },
        forms: {
            common: {
                save: 'Sacuvaj',
                login: 'Prijavi se',
                logout: 'Odjavi se',
                register: 'Registruj se',
                thisFieldIsRequired: 'Ovo polje je obavezno',
                emailFormatError: 'Unesite tacan format email adrese',
                reactApp: 'React app'
            },
            editUser: {
                title: 'Edit User',
            },
            addUser: {
                title: 'Add User',
            }
        },
        components: {
            FileUpload: {
                upload: 'Otpremi',
                files: 'Fajlovi',
                dragDrop: 'Prevucite neke fajlove ovde ili kliknite da izaberete',
            },
            yesNoDialog: {
                yes: 'Da',
                no: 'Ne',
                confirmDelete: 'Potvrdite brisanje',
                confirmDeleteMessage: 'Da li ste sigurni da zelite obrisati ovo polje?',
            }
        },
        pages: {
            register: {
                registration: 'Registracija',
                alreadyHaveAccount: 'Vec imate nalog?'
            },
            login: {
                createNewAccount: 'Napravite novi nalog',
                wrongUsernameOrPassword: 'Pogresno korisnicko ime ili sifra',
            },
            home: {
                title: 'Glavna stranica',
                welcome: 'Dobrodosli'
            },
            boardUser: {
                title: 'Korisnikova tabla'
            },
            boardModerator: {
                title: 'Moderatova tabla'
            },
            boardAdmin: {
                title: 'Adminova tabla'
            },
        }
    }
});

export default strings;
