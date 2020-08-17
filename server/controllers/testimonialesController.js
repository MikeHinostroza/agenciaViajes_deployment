const Testimonial = require('../models/Testimoniales');
//async await
exports.mostrarTestimoniales = async (req, res) => {
        const testimoniales = await Testimonial.findAll()
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    }

exports.agregarTestimonial = async (req, res) => {
        // Validar que todos los campos esten llenos 
        let {nombre, correo, mensaje} = req.body;

        let errores =[];
        if(!nombre){
            errores.push({'mensaje' : 'Agrega tu nombre'})
        }
        if(!correo){
            errores.push({'mensaje' : 'Agrega tu mail'})
        }
        if(!mensaje){
            errores.push({'mensaje' : 'Agrega tu mensaje '})
        }

        // Revisar por errores 
        if(errores.length > 0) {
            // Muestra la vista con errores
            const testimoniales = await Testimonial.findAll()
            res.render('testimoniales', {
                errores,
                nombre,
                correo,
                mensaje,
                pagina: 'Testimoniales',
                testimoniales
            })
            
        }else{
            // Almacenar en la BD
            Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            .then(testimonial => res.redirect('/testimoniales'))
            .catch(error => console.log(error));
        }
    }


    exports.mostrarTestimoniales = (req, res) => {
        Testimonial.findAll()
        .then(testimoniales => res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        }))
    }

// Promises 
// exports.agregarTestimonial = (req, res) => {
//         // Validar que todos los campos esten llenos 
//         let {nombre, correo, mensaje} = req.body;

//         let errores =[];
//         if(!nombre){
//             errores.push({'mensaje' : 'Agrega tu nombre'})
//         }
//         if(!correo){
//             errores.push({'mensaje' : 'Agrega tu mail'})
//         }
//         if(!mensaje){
//             errores.push({'mensaje' : 'Agrega tu mensaje '})
//         }

//         // Revisar por errores 
//         if(errores.length > 0) {
//             // Muestra la vista con errores
//             res.render('testimoniales', {
//                 errores,
//                 nombre,
//                 correo,
//                 mensaje
//             })
//         }else{
//             // Almacenar en la BD
//             Testimonial.create({
//                 nombre,
//                 correo,
//                 mensaje
//             })
//             .then(testimonial => res.redirect('/testimoniales'))
//             .catch(error => console.log(error));
//         }
//     }