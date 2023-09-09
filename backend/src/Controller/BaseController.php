<?php

namespace App\Controller;

use App\Entity\Enum\RoleEnum;
use App\Entity\Enum\UserTypeEnum;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Lexik\Bundle\JWTAuthenticationBundle\Encoder\JWTEncoderInterface;

class BaseController extends AbstractController
{
    protected $JWTEncoder;

    public function __construct(JWTEncoderInterface $JWTEncoder)
    {
        $this->JWTEncoder = $JWTEncoder;
    }

    protected function unauthorizedResponse()
    {
        return $this->responseWithMessage('Unauthorized request', 401);
    }

    protected function forbiddendResponse()
    {
        return $this->responseWithMessage('Forbidden request', 403);
    }

    protected function responseWithMessage($message = '', $statusCode = 200, $headers = [])
    {
        $data = [
            'message' => $message,
        ];

        return new JsonResponse($data, $statusCode, $headers);
    }

    public function getTokenFromRequest(Request $request)
    {
        $authorizationHeader = $request->headers->get('Authorization');
        if ($authorizationHeader) {
            if (preg_match('/Bearer\s+(.+)/', $authorizationHeader, $matches)) {
                $token = $matches[1];
                return $token;
            }
        }
        return null;
    }

    public function decodeToken($token)
    {
        try {
            return $this->JWTEncoder->decode($token);
        } catch (\Exception $exception) {
            return null;
        }
    }

    public function getCurrentUser(Request $request)
    {
        $token = $this->getTokenFromRequest($request);
        $decodedToken = $this->decodeToken($token);

        if(!empty($decodedToken)) {
            $user = new User();
            $user->setId($decodedToken['id']);
            $user->setName($decodedToken['name']);
            $user->setSurname($decodedToken['surname']);
            $user->setEmail($decodedToken['surname']);
            $user->setRole(RoleEnum::from($decodedToken['role']));
            $user->setUserType(UserTypeEnum::from($decodedToken['userType']));
            $user->setUsername($decodedToken['username']);
            return $user;
        }
        return null;
    }
}