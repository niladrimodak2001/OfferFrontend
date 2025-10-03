// import React from "react";
// import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 12,
//   },
//   section: {
//     marginBottom: 15,
//   },
//   categoryTitle: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   fieldTitle: {
//     marginBottom: 2,
//   },
//   placeholder: {
//     marginLeft: 15,
//   },
//   placeholderLabel: {
//     fontWeight: "bold",
//   },
// });

// const OfferLetterPDF = ({ offerLetter }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Offer Letter Header */}
//         <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
//           Offer Letter
//         </Text>

//         {/* Categories and Fields */}
//         {offerLetter.selectedCustomCategorySchema?.map(
//           (categoryObj, catIdx) => (
//             <View key={categoryObj._id} style={styles.section}>
//               <Text style={styles.categoryTitle}>
//                 {catIdx + 1}. 
//                 {categoryObj.category?.name || "Unnamed"}
//               </Text>

//               {categoryObj?.fieldValues?.map((field, fIdx) => {
                
//                 return (
//                   <View key={field.fieldId._id} >
//                     <Text>
//                       {field?.fieldId?.value}
//                     </Text>

//                     {field.placeHolders?.map((p) => (
//                       <Text key={p.type} style={styles.placeholder}>
//                         <Text style={styles.placeholderLabel}>{p.type}: </Text>
//                         <Text>{fv?.values?.get(p.type) || ""}</Text>
//                       </Text>
//                     ))}
//                   </View>
//                 );
//               })}
//             </View>
//           )
//         )}
//       </Page>
//     </Document>
//   );
// };

// export default OfferLetterPDF;
import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  section: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  fieldTitle: {
    marginBottom: 2,
  },
  placeholder: {
    marginLeft: 15,
  },
  placeholderLabel: {
    fontWeight: "bold",
  },
});

const OfferLetterPDF = ({ offerLetter }) => {

    const replacePlaceholders = (text, values) => {
      if (!text || !values) return text;

      // Match ${key} placeholders
      return text.replace(
        /\$\{(.*?)\}/g,
        (_, key) => values[key] || `\${${key}}`
      );
    };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Offer Letter Header */}
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
          Offer Letter
        </Text>
        <View style={styles.section}>
          <Text>Name: {offerLetter.name}</Text>
          <Text>Role: {offerLetter.role}</Text>
          <Text>Ref: {offerLetter.ref}</Text>
          {offerLetter.joiningDate && (
            <Text>
              Joining Date:{" "}
              {new Date(offerLetter.joiningDate).toLocaleDateString()}
            </Text>
          )}
        </View>

        {/* Categories and Fields */}
        {offerLetter.selectedCustomCategorySchema?.map(
          (categoryObj, catIdx) => (
            <View key={categoryObj._id} style={styles.section}>
              <Text style={styles.categoryTitle}>
                {catIdx + 1}.{categoryObj.category?.name || "Unnamed"}
              </Text>

              {categoryObj?.fieldValues?.map((field, fIdx) => {
                const fieldText = replacePlaceholders(
                  field?.fieldId?.value,
                  field?.values // assuming field.values is a Map
                );

                return (
                  <View key={field.fieldId._id}>
                    <Text>{fieldText}</Text>
                  </View>
                );
              })}
            </View>
          )
        )}
      </Page>
    </Document>
  );
};

export default OfferLetterPDF;
