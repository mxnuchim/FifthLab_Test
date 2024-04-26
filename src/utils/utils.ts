import { IUser } from "../types";

export const downloadCSV = (filteredUserData: IUser[] | null) => {
  const headerRow = [
    "Gender",
    "Title",
    "First Name",
    "Last Name",
    "Street Number",
    "Street Name",
    "City",
    "State",
    "Country",
    "Postcode",
    "Latitude",
    "Longitude",
    "Timezone Offset",
    "Timezone Description",
    "Email",
    "UUID",
    "Username",
    "Password",
    "Salt",
    "MD5",
    "SHA1",
    "SHA256",
    "DOB Date",
    "DOB Age",
    "Registered Date",
    "Registered Age",
    "Phone",
    "Cell",
    "ID Name",
    "ID Value",
    "Picture Large",
    "Picture Medium",
    "Picture Thumbnail",
    "Nationality",
  ];

  // Convert user data to CSV format including headers
  const csvContent = `${headerRow.join(",")}\n${filteredUserData
    ?.map((data) => {
      const values = [
        data.gender,
        data.name.title,
        data.name.first,
        data.name.last,
        data.location.street.number,
        data.location.street.name,
        data.location.city,
        data.location.state,
        data.location.country,
        data.location.postcode,
        data.location.coordinates.latitude,
        data.location.coordinates.longitude,
        data.location.timezone.offset,
        data.location.timezone.description,
        data.email,
        data.login.uuid,
        data.login.username,
        data.login.password,
        data.login.salt,
        data.login.md5,
        data.login.sha1,
        data.login.sha256,
        data.dob.date,
        data.dob.age,
        data.registered.date,
        data.registered.age,
        data.phone,
        data.cell,
        data.id.name,
        data.id.value,
        data.picture.large,
        data.picture.medium,
        data.picture.thumbnail,
        data.nat,
      ];

      return values
        .map((value) => (value !== undefined ? value : ""))
        .join(",");
    })
    .join("\n")}`;

  // Create a Blob and download the CSV file
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "user_data.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
