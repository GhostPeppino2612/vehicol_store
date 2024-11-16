import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Image } from "react-bootstrap";
import { RootState } from "../types/types";

export const ProfiloUtente: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [imageError, setImageError] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.json();
      })
      .then((resp) => {
        setProfileImage(resp.results[0].picture.large);
      })
      .catch((error) => {
        console.error("Error loading profile image:", error);
        setImageError(true);
      });
  }, []);

  if (!user) return null;

  return (
    <Container className="py-4">
      <Card>
        <Card.Body>
          <div className="text-center mb-4">
            {imageError ? (
              <Image
                src="https://via.placeholder.com/200"
                roundedCircle
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            ) : (
              profileImage && (
                <Image
                  src={profileImage}
                  roundedCircle
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
              )
            )}
          </div>
          <Card.Title className="text-center">{user.username}</Card.Title>
          <Card.Text className="text-center">Ruolo: {user.ruolo}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};
